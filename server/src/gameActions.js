// Handlers for the client's non-movement action channels: `game-actions`,
// `alchemica`, `combat`, `installations`. Each takes a `ctx` carrying the
// session plus send helpers, so this stays decoupled from the ws transport.
//
// ctx = {
//   session,
//   sendSelf(channel, data),    // -> this client
//   sendOthers(channel, data),  // -> every other client
//   sendAll(channel, data),     // -> everyone incl. self
//   ownedNearInstallations(),   // async () => installation[] near spawn (for resync)
// }
//
// Response envelope for `game-actions` mirrors the client's handleGameActions:
// the client reads { action, data } off the `game-actions` frame, so server
// replies are send(channel='game-actions', { action, data }).

import { enemiesNear, damageEnemy } from './combat.js';
import { addProgress } from './progression.js';
import { dropAlchemica } from './alchemica.js';
import { setDisplay, clearDisplay, nftFor } from './nftDisplayStore.js';
import { isNftDisplay } from './installations.js';

// Combat only gates AP when the combat zone is live (citaadel has no AP regen
// loop, so gating there would strand the harmless fire-for-visual at AP 0).
const COMBAT_ENABLED = process.env.COMBAT_ENABLED === 'true';
// AP spent per attack. With +2/s regen and maxAP 50 this caps sustained fire to
// a realistic rate instead of the previous free, unlimited kill/XP farming.
const AP_COST = { fire: 3, melee: 2 };

/** Route a `game-actions` frame ({ action, data }). */
export function handleGameAction(ctx, payload) {
  const action = payload?.action;
  const data = payload?.data || {};
  switch (action) {
    case 'spawn-player': {
      // Player (re)spawning into the world — make them visible/alive to everyone.
      ctx.session.isDead = false;
      ctx.sendOthers('player-visibility', { id: ctx.session.id, visible: true });
      break;
    }
    case 'tip': {
      // "Super chat": spend in-game wallet alchemica to broadcast a flashy message
      // to the channel. Client sends { message, amount:{FUD,FOMO,ALPHA,KEK} } and
      // only surfaces failures, so validate the balance, debit the wallet, relay.
      const s = ctx.session;
      if (!s.wallet) s.wallet = [0, 0, 0, 0];
      const amt = data.amount || {};
      const cost = [Number(amt.FUD) || 0, Number(amt.FOMO) || 0, Number(amt.ALPHA) || 0, Number(amt.KEK) || 0];
      const tipId = data.tipId ?? data.id;
      if (!cost.some((c) => c > 0)) {
        ctx.sendSelf('game-actions', { action: 'tip', data: { status: 'failed', tipId, error: 'No amount' } });
        break;
      }
      if (cost.some((c, i) => c > s.wallet[i])) {
        ctx.sendSelf('game-actions', { action: 'tip', data: { status: 'failed', tipId, error: 'Insufficient balance' } });
        break;
      }
      for (let i = 0; i < 4; i++) s.wallet[i] -= cost[i];
      s.tips = (s.tips || 0) + cost.reduce((a, b) => a + b, 0); // leaderboard: superchat value
      ctx.sendSelf('game-actions', { action: 'tip', data: { status: 'success', tipId } });
      ctx.sendSelf('items', {
        action: 'player-wallet-update',
        items: { fud: s.wallet[0], fomo: s.wallet[1], alpha: s.wallet[2], kek: s.wallet[3] },
      });
      const parts = ['FUD', 'FOMO', 'ALPHA', 'KEK'].map((t, i) => (cost[i] ? `${cost[i]} ${t}` : null)).filter(Boolean);
      ctx.sendAll('chat', {
        type: 'USER',
        id: s.id,
        name: s.name,
        time: Date.now(),
        message: `💎 ${String(data.message || '').slice(0, 300)} [tipped ${parts.join(', ')}]`,
        channel: s.chatChannel || 'global',
      });
      break;
    }
    case 'token-drop': {
      // Drop a breadcrumb of alchemica from the in-game wallet as a real,
      // collectable ground item. Client sends { token:'FUD'|'FOMO'|'ALPHA'|'KEK' }.
      const s = ctx.session;
      if (!s.wallet) s.wallet = [0, 0, 0, 0];
      const TYPES = ['fud', 'fomo', 'alpha', 'kek'];
      const type = TYPES.indexOf(String(data.token ?? data.type ?? '').toLowerCase());
      const DROP = 1;
      if (type < 0 || s.wallet[type] < DROP) break; // nothing to drop
      s.wallet[type] -= DROP;
      const item = dropAlchemica(ctx.session.x, ctx.session.y, type, DROP);
      ctx.sendAll('enter', { item: [item] });
      ctx.sendSelf('items', {
        action: 'player-wallet-update',
        items: { fud: s.wallet[0], fomo: s.wallet[1], alpha: s.wallet[2], kek: s.wallet[3] },
      });
      break;
    }
    case 'quickslot-use': {
      // Use a quickslot item (potion). Respond with the item-use lifecycle the
      // client expects: pending -> success, plus a quickslot-update.
      const { gotchiId, itemId, quickslotIndex } = data;
      ctx.sendSelf('game-actions', { action: 'item-use', data: { status: 'pending', gotchiId, itemId, quickslotIndex } });
      const quantityRemaining = Math.max(0, (data.quantity ?? 1) - 1);
      ctx.sendSelf('game-actions', {
        action: 'item-use',
        data: { status: 'success', gotchiId, itemId, quickslotIndex, quantityRemaining },
      });
      break;
    }
    case 'store-purchase': {
      // On-chain item-shop purchase. This server has no signing backend, so we
      // cannot grant items — respond failed (not a silent no-op, not a fake
      // success). The real purchase path runs through the wallet on-chain.
      ctx.sendSelf('game-actions', {
        action: 'store-purchase',
        data: { status: 'failed', error: 'Item shop runs on-chain via your wallet; not handled by this realm server.' },
      });
      break;
    }
    case 'combat-exit': {
      // Leaving the aarena — echo the exit data back so the client opens its
      // exit modal. Citaadel has no combat, so this is mostly a pass-through.
      ctx.sendSelf('game-actions', { action: 'combat-exit', data });
      break;
    }
    case 'attempt-respawn-buyback': {
      // Aarena death buyback — on-chain. Same constraint as store-purchase.
      ctx.sendSelf('game-actions', {
        action: 'respawn-buyback',
        data: { status: 'failed', error: 'Respawn buyback runs on-chain via your wallet; not handled by this realm server.' },
      });
      break;
    }
    default:
      // Unknown game-action: acknowledge nothing (client logs a warning itself).
      break;
  }
}

/** Route an `alchemica` frame ({ action, data }). */
export function handleAlchemicaAction(ctx, payload) {
  const action = payload?.action;
  const s = ctx.session;
  if (action === 'withdraw' || action === 'withdraw-from-player-wallet') {
    if (!s.carried) s.carried = [0, 0, 0, 0];
    if (!s.wallet) s.wallet = [0, 0, 0, 0];
    // Bank the gathered (carried) alchemica into the in-game wallet and clear the
    // pocket. These are distinct client balances: carried (UPDATE_ALCHEMICA) ->
    // in-game wallet (UPDATE_PLAYER_WALLET). Crediting the *on-chain* token
    // balance is a separate step that needs the production signing backend's
    // on-chain authority (mint/transfer), which this clone doesn't have — so the
    // bank is authoritative in-game state (persisted), not a real token transfer.
    let moved = 0;
    for (let i = 0; i < 4; i++) {
      moved += s.carried[i];
      s.wallet[i] += s.carried[i];
      s.carried[i] = 0;
    }
    if (!moved) return;
    ctx.sendSelf('items', { action: 'update', playerItems: { id: s.id, alchemica: [0, 0, 0, 0], alchemicaSum: 0 } });
    ctx.sendSelf('items', {
      action: 'player-wallet-update',
      items: { fud: s.wallet[0], fomo: s.wallet[1], alpha: s.wallet[2], kek: s.wallet[3] },
    });
  }
}

/** Route a `combat` frame ({ action, data }). Relays the visual + applies a
 * server-authoritative hit on the nearest enemy in weapon range (#5 combat). */
export function handleCombatAction(ctx, payload) {
  const action = payload?.action;
  const data = payload?.data || {};
  const s = ctx.session;
  if (action !== 'fire' && action !== 'melee') return;
  // AP gating (live combat only): no free, unlimited attacks. Reject when the
  // player can't afford the shot; otherwise debit AP and tell the client.
  if (COMBAT_ENABLED) {
    if (s.isDead) return;
    const cost = AP_COST[action];
    if ((s.ap ?? 0) < cost) return;
    s.ap -= cost;
    ctx.sendSelf('ap-changed', { id: s.id, ap: s.ap, type: 'player' });
  }
  if (action === 'fire') {
    ctx.sendAll('enter', {
      missile: [{ id: `m-${s.id}-${data.seq ?? 0}`, ownerId: s.id, x: Math.round(s.x), y: Math.round(s.y), angle: data.angle ?? 0, weaponType: data.weaponType ?? data.type ?? 0 }],
    });
  } else if (action === 'melee') {
    ctx.sendAll('enter', { melee: [{ id: `me-${s.id}-${data.seq ?? 0}`, ownerId: s.id, x: Math.round(s.x), y: Math.round(s.y), angle: data.angle ?? 0 }] });
  }
  // Damage the nearest enemy within weapon range (no-op when no enemies / combat off).
  const range = action === 'melee' ? 140 : 650;
  const dmg = action === 'melee' ? 18 : 12;
  const near = enemiesNear(s.x, s.y, range).sort((a, b) => Math.hypot(a.x - s.x, a.y - s.y) - Math.hypot(b.x - s.x, b.y - s.y));
  if (near.length) {
    const hit = damageEnemy(near[0].id, dmg);
    if (hit && hit.dead) {
      ctx.sendAll('leave', { enemy: [{ id: hit.id }] });
      // #6 progression: count the kill toward the slay quest (+ XP).
      for (const q of addProgress(ctx.session, 'kills', 1)) {
        ctx.sendSelf('chat', { type: 'SERVER', id: 'quest', name: 'Quest', time: Date.now(), message: `Quest complete: ${q.label} (+${q.reward} XP)`, channel: 'global' });
      }
    } else if (hit) {
      ctx.sendAll('health-changed', { id: hit.id, health: hit.health, damage: dmg, type: 'enemy' });
    }
  }

}

/** Route an `installations` frame ({ action, data }). */
export async function handleInstallationsAction(ctx, payload) {
  const action = payload?.action;
  const data = payload?.data || {};
  if (action === 'resync') {
    // Re-read and re-send the player's installations (e.g. after an upgrade).
    const installs = await ctx.ownedNearInstallations();
    if (installs.length) ctx.sendSelf('enter', { installation: installs });
  } else if (action === 'set-nft') {
    // Persist the owner's NFT pick so it STICKS for everyone who enters later
    // (the realm never stored this — see nftDisplayStore), then re-render live.
    // Client sends { installationId, data: serverData{ id, image, isSVG, tokenUri } }.
    const installationId = data.installationId ?? data.id;
    const serverData = data.data || {};
    // SECURITY: only the owner of the parcel this installation sits on may set it.
    // installationId = "parcelId_itemId_x_y_flag_state"; parcelId has no underscores.
    const parcelId = String(installationId || '').split('_')[0];
    const owns = (ctx.session.ownedParcels || []).some((p) => p.id === parcelId);
    if (!installationId || !owns) {
      ctx.sendSelf('installations', { action: 'set-nft', data: { installationId, status: 'failed', error: 'Not your parcel' } });
      return;
    }
    // Only actual NFT-display installations (type 5) can hold a pick.
    if (!isNftDisplay(installationId)) {
      ctx.sendSelf('installations', { action: 'set-nft', data: { installationId, status: 'failed', error: 'Not an NFT display' } });
      return;
    }
    if (serverData.id) {
      // Image is loaded as a texture by EVERY client, so only allow https urls.
      if (serverData.image && !/^https:\/\//i.test(String(serverData.image))) {
        ctx.sendSelf('installations', { action: 'set-nft', data: { installationId, status: 'failed', error: 'Image must be https' } });
        return;
      }
      setDisplay(installationId, serverData, ctx.session.id);
    } else {
      clearDisplay(installationId); // empty pick = reset to blank
    }
    // Live re-render for everyone in-world: destroy + recreate with the nft, since
    // createByIds skips installations that already exist (no isMove flag over the wire).
    ctx.sendAll('leave', { installation: [{ id: installationId }] });
    ctx.sendAll('enter', { installation: [{ id: installationId, nft: nftFor(installationId) }] });
    ctx.sendSelf('installations', { action: 'set-nft', data: { installationId, status: 'success' } });
  }
}
