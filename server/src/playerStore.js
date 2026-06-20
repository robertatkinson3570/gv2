// Persisted per-gotchi game state (carried alchemica + in-game wallet) so a
// player's progress survives reconnects and server restarts. Disk-backed JSON,
// debounced writes. Keyed by gotchi id.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE_PATH = join(__dirname, '../.cache/players.json');

const players = new Map(); // gotchiId -> { carried:[4], wallet:[4], ts }
try {
  const raw = JSON.parse(readFileSync(STORE_PATH, 'utf8'));
  for (const [k, v] of Object.entries(raw)) players.set(k, v);
  console.log(`[players] loaded ${players.size} saved players`);
} catch {
  /* no save yet */
}

let _saveTimer = null;
function saveSoon() {
  if (_saveTimer) return;
  _saveTimer = setTimeout(() => {
    _saveTimer = null;
    try {
      mkdirSync(dirname(STORE_PATH), { recursive: true });
      writeFileSync(STORE_PATH, JSON.stringify(Object.fromEntries(players)));
    } catch (e) {
      console.warn('[players] save failed:', e.message);
    }
  }, 5000);
}

const zero4 = () => [0, 0, 0, 0];

/** Load a player's saved state (carried/wallet + progression; defaults to empty). */
export function loadPlayer(id) {
  const p = players.get(String(id)) || {};
  return {
    carried: Array.isArray(p.carried) ? p.carried.slice(0, 4) : zero4(),
    wallet: Array.isArray(p.wallet) ? p.wallet.slice(0, 4) : zero4(),
    xp: p.xp || 0,
    gathered: p.gathered || 0,
    kills: p.kills || 0,
    tips: p.tips || 0,
    name: p.name || '',
    questDone: Array.isArray(p.questDone) ? p.questDone : [],
    lastX: Number.isFinite(p.lastX) ? p.lastX : NaN,
    lastY: Number.isFinite(p.lastY) ? p.lastY : NaN,
  };
}

/** Persist a player's carried + in-game wallet + progression (pass the session). */
export function savePlayer(id, s) {
  players.set(String(id), {
    carried: (s.carried || zero4()).slice(0, 4),
    wallet: (s.wallet || zero4()).slice(0, 4),
    xp: s.xp || 0,
    gathered: s.gathered || 0,
    kills: s.kills || 0,
    tips: s.tips || 0,
    name: s.name || '',
    questDone: [...(s.questDone || [])],
    lastX: Number.isFinite(s.x) ? s.x : undefined,
    lastY: Number.isFinite(s.y) ? s.y : undefined,
    ts: Date.now(),
  });
  saveSoon();
}

/** All persisted players (for the leaderboard). Returns [{ id, ...stats }]. */
export function listPlayers() {
  return [...players.entries()].map(([id, p]) => ({ id, ...p }));
}
