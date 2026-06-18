const secp = require('@noble/secp256k1');
const { createHmac } = require('crypto');

const toBytes = (value) => {
  if (value instanceof Uint8Array) return value;
  if (Array.isArray(value)) return Uint8Array.from(value);
  if (typeof value === 'string') {
    const hex = value.startsWith('0x') ? value.slice(2) : value;
    return Uint8Array.from(Buffer.from(hex, 'hex'));
  }
  return Uint8Array.from(value);
};

const toHex = (bytes) => Buffer.from(bytes).toString('hex');

secp.utils.hmacSha256Sync = (key, ...messages) => {
  const hmac = createHmac('sha256', Buffer.from(key));
  for (const message of messages) hmac.update(Buffer.from(message));
  return Uint8Array.from(hmac.digest());
};

const toBigInt = (value) => {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'string') return BigInt(value.startsWith('0x') ? value : `0x${value}`);
  if (value && typeof value.toString === 'function') return BigInt(`0x${value.toString(16)}`);
  return BigInt(value);
};

const numberLike = (value) => ({
  toString: (radix = 10) => toBigInt(value).toString(radix),
});

class PublicPoint {
  constructor(bytes) {
    this.bytes = toBytes(bytes);
  }

  add(other) {
    return new PublicPoint(secp.Point.fromHex(this.bytes).add(secp.Point.fromHex(other.bytes)).toRawBytes(false));
  }

  encode(format, compact) {
    const bytes = secp.Point.fromHex(this.bytes).toRawBytes(!!compact);
    return format === 'hex' ? toHex(bytes) : Array.from(bytes);
  }

  encodeCompressed(format) {
    const bytes = secp.Point.fromHex(this.bytes).toRawBytes(true);
    return format === 'hex' ? toHex(bytes) : Array.from(bytes);
  }
}

class KeyPair {
  constructor(privateKey, publicKey) {
    this.privateKey = privateKey ? toBytes(privateKey) : undefined;
    this.pub = new PublicPoint(publicKey || secp.getPublicKey(this.privateKey, false));
  }

  getPublic(compact, format) {
    const bytes = secp.Point.fromHex(this.pub.bytes).toRawBytes(!!compact);
    return format === 'hex' ? toHex(bytes) : Array.from(bytes);
  }

  sign(digest, options = {}) {
    const [signature, recoveryParam] = secp.signSync(toBytes(digest), this.privateKey, {
      canonical: options.canonical !== false,
      der: false,
      recovered: true,
    });
    return {
      recoveryParam,
      r: numberLike(`0x${toHex(signature.slice(0, 32))}`),
      s: numberLike(`0x${toHex(signature.slice(32, 64))}`),
    };
  }

  derive(publicKey) {
    const shared = secp.getSharedSecret(this.privateKey, toBytes(publicKey), false).slice(1, 33);
    return numberLike(`0x${toHex(shared)}`);
  }
}

class EC {
  constructor(name) {
    if (name !== 'secp256k1') throw new Error(`Unsupported curve: ${name}`);
  }

  keyFromPrivate(privateKey) {
    return new KeyPair(privateKey);
  }

  keyFromPublic(publicKey) {
    return new KeyPair(undefined, publicKey);
  }

  recoverPubKey(digest, signature, recoveryParam) {
    const r = toHex(toBytes(signature.r));
    const s = toHex(toBytes(signature.s));
    const recovered = secp.recoverPublicKey(toBytes(digest), `${r}${s}`, recoveryParam, false);
    return new PublicPoint(recovered);
  }
}

module.exports = { ec: EC };
module.exports.default = module.exports;
