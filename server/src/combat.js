// #5 Combat: server-authoritative Lickquidator enemies with simple AI (chase the
// nearest player, attack in range), plus projectile/melee damage, health, and
// death. All in-memory. The citaadel is peaceful by default (COMBAT_ENABLED);
// this drives an aarena-style combat zone when enabled.

const enemies = new Map(); // id -> { id, x, y, name, type, health, maxHealth, lastAttack }
let _eseq = 0;

const ENEMY_HP = 100;
const ENEMY_SPEED = 7; // px per tick
const ENEMY_ATTACK_RANGE = 96; // px
const ENEMY_DMG = 7;
const ENEMY_ATTACK_CD = 1200; // ms

const rnd = (n) => Math.floor(Math.random() * n);

/** Spawn `n` Lickquidators scattered around (cx,cy). Returns the new enemies. */
export function spawnEnemies(cx, cy, n, spread = 900) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const e = {
      id: `enemy-${++_eseq}`,
      x: Math.round(cx + rnd(spread * 2) - spread),
      y: Math.round(cy + rnd(spread * 2) - spread),
      name: 'Lickquidator',
      type: 'GMLS',
      health: ENEMY_HP,
      maxHealth: ENEMY_HP,
      lastAttack: 0,
    };
    enemies.set(e.id, e);
    out.push(e);
  }
  return out;
}

/** Enemies within `radius` px of (x,y) — for AOI streaming. */
export function enemiesNear(x, y, radius) {
  const r2 = radius * radius;
  const out = [];
  for (const e of enemies.values()) {
    const dx = e.x - x;
    const dy = e.y - y;
    if (dx * dx + dy * dy <= r2) out.push(e);
  }
  return out;
}

/** Remove every enemy within `radius` px of (x,y). Returns the removed ids so
 * the caller can tell clients to despawn them (used on respawn so the player
 * isn't dropped straight back into the swarm that just killed them). */
export function clearEnemiesNear(x, y, radius) {
  const r2 = radius * radius;
  const removed = [];
  for (const [id, e] of enemies) {
    const dx = e.x - x;
    const dy = e.y - y;
    if (dx * dx + dy * dy <= r2) {
      enemies.delete(id);
      removed.push(id);
    }
  }
  return removed;
}

/** Apply damage to an enemy. Returns { id, health, dead } or null if gone. */
export function damageEnemy(id, dmg) {
  const e = enemies.get(id);
  if (!e) return null;
  e.health -= dmg;
  if (e.health <= 0) {
    enemies.delete(id);
    return { id, health: 0, dead: true };
  }
  return { id, health: e.health, dead: false };
}

/**
 * AI tick: each enemy chases the nearest live player and attacks in range.
 * @param {Array<{id,x,y,isDead}>} players
 * @returns {{ moves: Array, attacks: Array }} moves -> positions(enemy); attacks -> player damage
 */
export function combatTick(players, now) {
  const moves = [];
  const attacks = [];
  const alive = players.filter((p) => !p.isDead);
  for (const e of enemies.values()) {
    let nearest = null;
    let nd2 = Infinity;
    for (const p of alive) {
      const dx = p.x - e.x;
      const dy = p.y - e.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < nd2) {
        nd2 = d2;
        nearest = p;
      }
    }
    if (!nearest) continue;
    const dist = Math.sqrt(nd2) || 1;
    if (dist > ENEMY_ATTACK_RANGE) {
      const ux = (nearest.x - e.x) / dist;
      const uy = (nearest.y - e.y) / dist;
      e.x += ux * ENEMY_SPEED;
      e.y += uy * ENEMY_SPEED;
      moves.push({ id: e.id, x: Math.round(e.x), y: Math.round(e.y), direction: { x: ux, y: uy }, isSprinting: false });
    } else if (now - e.lastAttack > ENEMY_ATTACK_CD) {
      e.lastAttack = now;
      attacks.push({ playerId: nearest.id, enemyId: e.id, dmg: ENEMY_DMG });
    }
  }
  return { moves, attacks };
}

export function enemyCount() {
  return enemies.size;
}
