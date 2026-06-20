// Sign-In-With-Ethereum handshake for the realm `enter`. The realm previously
// trusted the client-supplied `owner`/`id` outright, so anyone could claim (or
// kick) any gotchi by quoting its public id. SIWE proves the connection
// actually controls the `owner` wallet: the client fetches a one-time nonce,
// signs a message containing it, and the server recovers the signer.
//
// Pairs with on-chain ownership (auth.js / ENFORCE_AUTH): SIWE proves *which
// wallet* you are, verifyGotchiAccess proves *that wallet owns the gotchi*.

import { randomBytes } from 'node:crypto';
import { verifyMessage } from 'ethers';

const DOMAIN = process.env.SIWE_DOMAIN || 'gotchiverse-realm';
const TTL_MS = Number(process.env.SIWE_TTL_MS) || 5 * 60 * 1000;

// addressLower -> { nonce, exp }. Single-use, short-lived; bounded by issuance.
const nonces = new Map();

const lower = (a) => String(a || '').toLowerCase();
export const addrEq = (a, b) => !!a && !!b && lower(a) === lower(b);

/** Issue a one-time nonce + the exact message the client must sign. */
export function issueNonce(address) {
  const addr = lower(address);
  const nonce = randomBytes(16).toString('hex');
  nonces.set(addr, { nonce, exp: Date.now() + TTL_MS });
  const issuedAt = new Date().toISOString();
  const message =
    `${DOMAIN} wants you to sign in with your Ethereum account:\n` +
    `${address}\n\n` +
    `Sign in to the Gotchiverse realm.\n\n` +
    `Nonce: ${nonce}\n` +
    `Issued At: ${issuedAt}`;
  return { nonce, message };
}

/**
 * Verify a SIWE proof. siwe = { message, signature, address }.
 * @returns {{ ok: boolean, address?: string, reason?: string }}
 */
export function verifySiwe(siwe) {
  try {
    if (!siwe || !siwe.message || !siwe.signature || !siwe.address) return { ok: false, reason: 'missing' };
    const addr = lower(siwe.address);
    const rec = nonces.get(addr);
    if (!rec) return { ok: false, reason: 'no-nonce' };
    if (Date.now() > rec.exp) { nonces.delete(addr); return { ok: false, reason: 'expired' }; }
    // The message must carry the nonce we issued for this address (anti-replay).
    if (!String(siwe.message).includes(`Nonce: ${rec.nonce}`)) return { ok: false, reason: 'nonce-mismatch' };
    const recovered = verifyMessage(siwe.message, siwe.signature);
    if (!addrEq(recovered, addr)) return { ok: false, reason: 'bad-signature' };
    nonces.delete(addr); // single use
    return { ok: true, address: recovered };
  } catch {
    return { ok: false, reason: 'verify-error' };
  }
}
