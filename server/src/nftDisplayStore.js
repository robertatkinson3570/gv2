// Persisted NFT-display picks: which NFT (image) a parcel owner put on each
// NFT-display installation. The realm contract never stored this (it only keeps
// an allowed-contract whitelist) — the original choice lived in a proprietary
// off-chain backend — so we own it here. Keyed by installation id. Disk-backed.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE_PATH = join(__dirname, '../.cache/nftDisplays.json');

const displays = new Map(); // installationId -> { id, image, isSVG, tokenUri, by, ts }
try {
  const raw = JSON.parse(readFileSync(STORE_PATH, 'utf8'));
  for (const [k, v] of Object.entries(raw)) displays.set(k, v);
  console.log(`[nftDisplay] loaded ${displays.size} saved displays`);
} catch {
  /* none yet */
}

let _saveTimer = null;
function saveSoon() {
  if (_saveTimer) return;
  _saveTimer = setTimeout(() => {
    _saveTimer = null;
    try {
      mkdirSync(dirname(STORE_PATH), { recursive: true });
      writeFileSync(STORE_PATH, JSON.stringify(Object.fromEntries(displays)));
    } catch (e) {
      console.warn('[nftDisplay] save failed:', e.message);
    }
  }, 3000);
}

/** Store an owner's NFT pick for an installation. serverData = {id, image, isSVG, tokenUri}. */
export function setDisplay(installationId, serverData, by) {
  displays.set(String(installationId), {
    id: serverData.id,
    image: serverData.image,
    isSVG: !!serverData.isSVG,
    tokenUri: serverData.tokenUri,
    by,
    ts: Date.now(),
  });
  saveSoon();
}

/** The stored pick for an installation (or null). */
export function getDisplay(installationId) {
  return displays.get(String(installationId)) || null;
}

/** Reset an installation back to blank. */
export function clearDisplay(installationId) {
  if (displays.delete(String(installationId))) saveSoon();
}

/** The `nft` object the client's createByIds/displayPhaserImage expects, or null. */
export function nftFor(installationId) {
  const d = displays.get(String(installationId));
  return d ? { id: d.id, image: d.image, isSVG: d.isSVG } : null;
}
