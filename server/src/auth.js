// #8 Anti-spoof: verify at join that the connecting wallet actually owns OR
// rents the gotchi it claims, by reading the aavegotchi-core-base subgraph.
// Returns { ok, reason } — callers decide whether to enforce (kick) or just flag.

const CORE_SUBGRAPH =
  process.env.CORE_SUBGRAPH ||
  'https://api.goldsky.com/api/public/project_cmh3flagm0001r4p25foufjtt/subgraphs/aavegotchi-core-base/prod/gn';

async function queryCore(query) {
  const res = await fetch(CORE_SUBGRAPH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return (await res.json())?.data;
}

/**
 * @returns {Promise<{ ok: boolean, reason: string }>}
 * ok=true if the wallet owns the gotchi, is its originalOwner (lender), or is the
 * active borrower. Subgraph errors resolve ok=true (don't lock out on an outage).
 */
export async function verifyGotchiAccess(wallet, gotchiId) {
  if (!wallet || !gotchiId) return { ok: true, reason: 'no-id' };
  // Spectator/freebie ids are wallet addresses, not gotchi ids — nothing to verify.
  if (String(gotchiId).startsWith('0x')) return { ok: true, reason: 'spectator' };
  const w = String(wallet).toLowerCase();
  try {
    const g = (await queryCore(`{ aavegotchi(id:"${gotchiId}"){ owner{id} originalOwner{id} lending } }`))?.aavegotchi;
    if (!g) return { ok: false, reason: 'gotchi-not-found' };
    if (g.owner?.id?.toLowerCase() === w || g.originalOwner?.id?.toLowerCase() === w) return { ok: true, reason: 'owner' };
    if (g.lending) {
      const l = (await queryCore(`{ gotchiLending(id:"${g.lending}"){ borrower completed } }`))?.gotchiLending;
      if (l && !l.completed && l.borrower?.toLowerCase() === w) return { ok: true, reason: 'borrower' };
    }
    return { ok: false, reason: 'not-owner-or-borrower' };
  } catch {
    return { ok: true, reason: 'verify-error-allow' };
  }
}
