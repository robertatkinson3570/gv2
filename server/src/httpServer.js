// HTTP side of the realm server: the /realm/socket lookup the client calls
// before opening the WebSocket, plus permissive CORS and a catch-all stub so the
// client's other pre-enter GETs don't throw or spam the console.

import http from 'node:http';
import { PUBLIC_WS_URL, ZONE_ID } from './config.js';
import { listPlayers } from './playerStore.js';
import { forEachSession } from './world.js';
import { issueNonce } from './siwe.js';

// Build the leaderboard the client fetches from `${API_URL}/leaderboard/all`.
// Merge persisted players with live sessions (live stats win), shape into the
// client's LeaderboardData, sort by the requested field, paginate.
function buildLeaderboard(sortBy, dir, limit, offset) {
  const byId = new Map();
  for (const p of listPlayers()) {
    byId.set(String(p.id), { id: p.id, name: p.name, kills: p.kills || 0, gathered: p.gathered || 0, tips: p.tips || 0 });
  }
  forEachSession((_ws, s) => {
    byId.set(String(s.id), { id: s.id, name: s.name, kills: s.kills || 0, gathered: s.gathered || 0, tips: s.tips || 0 });
  });
  const rows = [...byId.values()].filter((p) => /^\d+$/.test(String(p.id))).map((p) => ({
    rank: 0,
    id: Number(p.id) || 0,
    deaths: 0,
    kills: p.kills,
    hits: 0,
    lastDeathTime: 0,
    lastHitTime: 0,
    name: p.name || `Gotchi ${p.id}`,
    sessionTime: 0,
    alchemicaPickedUp: p.gathered,
    tips: p.tips,
    tipsAverage: 0,
    tipsSent: p.tips > 0 ? 1 : 0,
    tipsValueSent: p.tips,
  }));
  const KEY = { kills: 'kills', alchemicaPickedUp: 'alchemicaPickedUp', tips: 'tipsValueSent', tipsValueSent: 'tipsValueSent' };
  const key = KEY[sortBy] || 'kills';
  rows.sort((a, b) => (dir === 'asc' ? a[key] - b[key] : b[key] - a[key]));
  rows.forEach((r, i) => (r.rank = i + 1));
  const page = rows.slice(offset, offset + limit);
  return { leaderboard: page, gotchis: page };
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
}

function json(res, status, body) {
  cors(res);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

/** Build (but don't start) the HTTP server; ws attaches to it in index.js. */
export function createHttpServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') {
      cors(res);
      res.writeHead(204);
      res.end();
      return;
    }

    // The one endpoint that matters for M1: hand back this single zone's socket.
    if (url.pathname === '/realm/socket') {
      json(res, 200, { socketUrl: PUBLIC_WS_URL, id: ZONE_ID });
      return;
    }

    // SIWE: issue a one-time nonce + message for the client to sign before
    // `enter`. The signature (in the enter payload) proves wallet control.
    if (url.pathname === '/realm/auth/nonce') {
      const address = url.searchParams.get('address') || '';
      if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
        json(res, 400, { error: 'valid ?address=0x… required' });
        return;
      }
      json(res, 200, issueNonce(address));
      return;
    }

    // Leaderboard the client's Leaderboard/LeaderboardScreen fetch from this same
    // API host (NEXT_PUBLIC_API_URL = this server). Built from server-tracked
    // kills / alchemica gathered / superchat tips.
    if (url.pathname === '/leaderboard/all') {
      const limit = Math.min(100, Number(url.searchParams.get('limit')) || 10);
      const offset = Math.max(0, Number(url.searchParams.get('offset')) || 0);
      const sortBy = url.searchParams.get('sortBy') || 'kills';
      const dir = url.searchParams.get('sortType') === 'asc' ? 'asc' : 'desc';
      json(res, 200, buildLeaderboard(sortBy, dir, limit, offset));
      return;
    }

    // M3: channel/claim signature. On Base the on-chain LibSignature check was
    // removed, so an empty signature is accepted. The client does
    // `Object.values(signature)` and passes the result as the bytes arg, so {} ->
    // [] -> 0x. This unblocks channelAlchemica / claimAvailableAlchemica with no
    // backend signer (the real Polygon backend issued a signed payload here).
    if (url.pathname === '/realm/alchemica/signature/channel/get') {
      json(res, 200, { signature: {} });
      return;
    }

    // #4 Crafting: installation equip / upgrade / speedup signatures. Same Base
    // story — empty signature accepted on-chain. Here the client does
    // `Object.values(data)` on the WHOLE response, so {} -> [] -> 0x. After the
    // on-chain equip lands, the client sends `installations`/`resync` and the
    // server re-reads the grid to render the new build.
    if (url.pathname.startsWith('/realm/installation/signature/')) {
      json(res, 200, {});
      return;
    }

    // Everything else the client may probe before entering (parcel/info,
    // gotchi/status, user/*, item-store, …) — return empty 200 so fetch().json()
    // resolves instead of throwing. These don't gate entering the world in M1.
    json(res, 200, {});
  });
}
