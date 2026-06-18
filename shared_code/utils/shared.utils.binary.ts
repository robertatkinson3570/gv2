const BINARY_CONFIG = {
  bytesPerChar: 1, // How many bytes to encode a character of a string
  booleanBytes: 1, // How many bytes to use to represent booleans (= 8 booleans per byte allocated),
  propertiesBytes: 4, // How many bytes to use to encode the presence or absence of properties in the object (one property per bit, allows for up to 8*bytes properties)
  numberBytes: 4, // How many signed bytes to use to encode numbers
  floatBytes: 4,
  decimalPlaces: 4, // How many decimals to round floats to
};

// List of top-level schemas sent from server to client. Their index in this list is used to encode them instead of their names.
// Top-level schema = a schema that doesn't come nested within another schema
const schemasList = ['enter', 'leave', 'positions', 'pong'];
const redisSchemasList = ['global-player-position', 'alchemica-take-confirmation'];

const itemsSchema = {
  strings: ['id', 'type', 'label'],
  numbers: ['x', 'y'],
  floats: ['quantity'],
  booleans: ['created', 'breadcrumb'],
};

const inventoryItemsSchema = {
  strings: ['id', 'itemId', 'label'],
  numbers: ['x', 'y'],
  floats: ['quantity'],
  booleans: ['created'],
};

const playersSchema = {
  strings: ['id', 'type', 'name', 'collateralColor', 'facingDirection'],
  numbers: ['x', 'y', 'level', 'health', 'maxHealth', 'spectatorColor'],
  booleans: ['created', 'isShadowBanned', 'isLent', 'isFocused', 'isSpectator', 'isDead', 'isSprinting', 'isSpinning'],
};

const directionSchema = {
  floats: ['x', 'y'],
};

const enemiesSchema = {
  strings: ['id', 'type', 'name', 'createdAt'],
  numbers: ['x', 'y', 'health', 'maxHP'],
  booleans: ['created'],
  objects: {
    creator: {
      strings: ['id', 'name'],
    },
    direction: directionSchema,
  },
};

const parcelsSchema = {
  strings: ['id', 'type'],
  booleans: ['created'],
};

const padSchema = {
  strings: ['id', 'use'],
  numbers: ['x', 'y'],
};

const vector2 = {
  numbers: ['x', 'y'],
};

const installationsSchema = {
  strings: ['id', 'type'],
  booleans: ['created'],
  objects: {
    nft: {
      strings: ['id', 'image'],
      booleans: ['isSVG'],
    },
  },
};

const tilesSchema = {
  strings: ['id', 'type'],
  booleans: ['created'],
};

/**
 * Some schema recycling is taking place here:
 * 1. This schema is used for both 'enter' and 'positions' events; 'enter' events have the 'direction' field,
 * 'positions' event don't, but it's ok if an object has fewer fields than the schema (but not the opposite),
 * because then the missing fields are just skipped.
 * 2. This schema is used for both players and missile positions because they behave in the same way, have the same
 * spatial properties and thus can be encoded similarly.
 * */
const positionSchema = {
  strings: ['id'],
  numbers: ['x', 'y'],
  objects: {
    direction: directionSchema,
  },
};

const itemLeaveSchema = {
  strings: ['id'],
  booleans: ['destroyed'],
};

const padLeaveSchema = {
  strings: ['id'],
  booleans: ['destroyed'],
};

const inventoryItemLeaveSchema = {
  strings: ['id'],
  booleans: ['destroyed'],
};

const playerLeaveSchema = {
  strings: ['id'],
  booleans: ['destroyed'],
};

const missileLeaveSchema = {
  strings: ['id'],
  booleans: ['destroyed'],
};

const enemyLeaveSchema = {
  strings: ['id'],
  booleans: ['destroyed'],
};

const meleeSchema = {
  strings: ['id'],
  numbers: ['x', 'y', 'size'],
  booleans: ['created', 'destroyed', 'isRush'],
  objects: {
    direction: directionSchema,
  },
};

const questSchema = {
  strings: ['id', 'use'],
  objects: {
    position: vector2,
  },
};

const pongSchema = {
  numbers: ['channel'],
  objects: {
    data: {
      numbers: ['playerCountLocal', 'playerCountGlobal', 'alchemicaCountLocal', 'alchemicaCountGlobal', 'queueCountSpillovers', 'queueCountPickups', 'queueCountWithdrawls'],
    },
  },
};

const globalPositionsSchema = {
  numbers: ['v'],
  bignumbers: ['time'],
  strings: ['host'],
  arrays: {
    players: {
      booleans: ['started_moving', 'stopped_moving'],
      strings: ['id'],
      numbers: ['x', 'y'],
      objects: {
        direction: {
          numbers: ['x', 'y'],
        },
      },
    },
  },
};

const chatSchema = {
  strings: ['id', 'name', 'channel', 'message'],
  bignumbers: ['time'],
};

const alchemicaPocketSchema = {
  primitive: true,
  type: 'float',
};

const missileEnterSchema = {
  strings: ['id'],
  numbers: ['x', 'y', 'size'],
  booleans: ['isCharged'],
  objects: {
    direction: directionSchema,
  },
};

const enterEventSchema = {
  numbers: ['channel'],
  objects: {
    data: {
      arrays: {
        installation: installationsSchema,
        item: itemsSchema,
        missile: missileEnterSchema,
        melee: meleeSchema,
        parcel: parcelsSchema,
        player: playersSchema,
        enemy: enemiesSchema,
        pad: padSchema,
        tile: tilesSchema,
        quest: questSchema,
        inventoryItem: inventoryItemsSchema,
      },
    },
  },
};

const positionsEventSchema = {
  numbers: ['channel'],
  objects: {
    data: {
      arrays: {
        // Same schema used for positions of players and missiles, as they boild down to the same properties
        player: positionSchema,
        missile: positionSchema,
        melee: positionSchema,
        enemy: positionSchema,
      },
    },
  },
};

const leaveEventSchema = {
  numbers: ['channel'],
  objects: {
    data: {
      arrays: {
        installation: installationsSchema,
        item: itemLeaveSchema,
        inventoryItem: inventoryItemLeaveSchema,
        pad: padLeaveSchema,
        missile: missileLeaveSchema,
        melee: meleeSchema,
        parcel: parcelsSchema,
        player: playerLeaveSchema,
        enemy: enemyLeaveSchema,
        tile: tilesSchema,
        quest: questSchema,
      },
    },
  },
};

const alchemicaSchema = {
  strings: ['action'],
  arrays: {
    data: {
      floats: ['quantity'],
      strings: ['gotchi', 'status', 'type', 'alchemicaId'],
      booleans: ['refund'],
      arrays: {
        alchemica: alchemicaPocketSchema,
      },
    },
  },
};

export const binarySchemas = {
  globalPositionsSchema,
  enterEventSchema,
  leaveEventSchema,
  positionsEventSchema,
  pongSchema,
  alchemicaSchema,
  schemasList,
};

/* ### ENCODING ### */

export function encode(obj, schemaName, schema, redis = false) {
  // Encode an object according to a specific schema

  // Compute the number of bytes needed to encode the object according to the provided schema, so that a buffer of the appropate size can be created
  const size = 1 + computeSize(obj, schema); // Add bytes for the schema ID
  const buffer = new ArrayBuffer(size);

  const schemas = redis ? redisSchemasList : schemasList;

  const dv = new DataView(buffer);
  let offset = 0;
  const schemaID = schemas.indexOf(schemaName);
  if (schemaID === -1) console.error('Binary encoding an object of unknown schema');
  offset += encodeBytes(dv, offset, 1, schemaID);

  const encodeResult = encodeObject(obj, size, schema, buffer, offset); // Encode the object ; the last two parameters are used for recursive calls only
  return encodeResult.buffer; // Return the buffer of the encoded object
}

function computeSize(obj, schema) {
  let size = BINARY_CONFIG.propertiesBytes; // Allocate bytes for the header indicating the presence/absence of fields in the object

  if (schema.numbers) {
    // Count the bytes needed for numerical values
    schema.numbers.forEach(function (key) {
      if (obj[key] !== undefined) {
        size += BINARY_CONFIG.numberBytes;
      }
    });
  }

  if (schema.bignumbers) {
    // Count the bytes needed for numerical values
    schema.bignumbers.forEach(function (key) {
      if (obj[key] !== undefined) {
        size += 8;
      }
    });
  }

  if (schema.floats) {
    // Count the bytes needed for numerical values
    schema.floats.forEach(function (key) {
      if (obj[key] !== undefined) size += BINARY_CONFIG.floatBytes;
    });
  }

  if (schema.strings) {
    // Count the bytes need for each string
    schema.strings.forEach(function (key) {
      if (obj[key] !== undefined && obj[key] !== null) size += obj[key].length * BINARY_CONFIG.bytesPerChar + 1; // bytesPerChar bytes per character + 1 byte to indicate the length of the string
    });
  }

  if (schema.arrays) {
    // Iterate over all lists of objetcs
    Object.keys(schema.arrays).forEach(function (arrayOfObjects) {
      // For each list, iterate over its content
      if (obj[arrayOfObjects] !== undefined) {
        // If the object to encode has the property
        size += 4; // 4 bytes to store array size
        const sc = schema.arrays[arrayOfObjects]; // Indicate the schema of the current array item to encode
        // Iterate over each object in the array that is being encoded
        obj[arrayOfObjects].forEach(function (subObject) {
          if (sc.primitive) {
            if (sc.type === 'int') size += BINARY_CONFIG.numberBytes;
            if (sc.type === 'float') size += BINARY_CONFIG.floatBytes;
          } else {
            size += computeSize(subObject, sc); // Recursively compute the size for sub-objects to encode
          }
        });
      }
    });
  }

  if (schema.objects) {
    Object.keys(schema.objects).forEach(function (objName) {
      if (obj[objName] !== undefined) size += computeSize(obj[objName], schema.objects[objName]);
    });
  }

  size += BINARY_CONFIG.booleanBytes;

  return size;
}

function encodeObject(obj, size, schema, buf, offset) {
  // console.log('Encoding ', obj);
  const buffer = buf || new ArrayBuffer(size); // If first call, create a new buffer ; if recursive call, use provided buffer
  const dv = new DataView(buffer);
  const headerOffset = offset; // Position where the header byte(s) will be written
  offset = encodeBytes(dv, offset, BINARY_CONFIG.propertiesBytes, 0); // Temporary 0 value for header byte(s)
  let propertiesMask = 0; // Sequence of bits to indicate which fields of the schema are present in the object or not

  if (schema.strings) {
    schema.strings.forEach(function (key) {
      if (obj[key] !== undefined) {
        const length = obj[key].length;
        offset = encodeBytes(dv, offset, 1, length);
        encodeString(dv, offset, obj[key]);
        offset += length * BINARY_CONFIG.bytesPerChar;
        propertiesMask |= 1;
      }
      propertiesMask <<= 1;
    });
  }

  if (schema.numbers) {
    schema.numbers.forEach(function (key) {
      if (obj[key] !== undefined) {
        offset = encodeBytes(dv, offset, BINARY_CONFIG.numberBytes, obj[key]);
        propertiesMask |= 1; // Indicate in the mask that the field is present
      }
      propertiesMask <<= 1;
    });
  }

  if (schema.bignumbers) {
    schema.bignumbers.forEach(function (key) {
      if (obj[key] !== undefined) {
        // console.log("Encoding "+key+" at offset "+offset);
        offset = encodeBigNumber(dv, offset, obj[key]);
        propertiesMask |= 1; // Indicate in the mask that the field is present
      }
      propertiesMask <<= 1;
    });
  }

  if (schema.floats) {
    schema.floats.forEach(function (key) {
      if (obj[key] !== undefined) {
        offset = encodeFloat(dv, offset, BINARY_CONFIG.floatBytes, obj[key]);
        propertiesMask |= 1; // Indicate in the mask that the field is present
      }
      propertiesMask <<= 1;
    });
  }

  if (schema.arrays) {
    // Iterate over all lists of objetcs
    Object.keys(schema.arrays).forEach(function (arrayOfObjects) {
      // For each list, iterate over the its content
      if (obj[arrayOfObjects] !== undefined) {
        offset = encodeBytes(dv, offset, 4, obj[arrayOfObjects].length); // Number of objects in the array (length of the array)
        propertiesMask |= 1;
        const sc = schema.arrays[arrayOfObjects];
        obj[arrayOfObjects].forEach(function (subObject) {
          if (sc.primitive) {
            if (sc.type === 'int') offset = encodeBytes(dv, offset, BINARY_CONFIG.numberBytes, subObject);
            if (sc.type === 'float') offset = encodeFloat(dv, offset, BINARY_CONFIG.floatBytes, subObject);
          } else {
            const res = encodeObject(subObject, null, sc, buffer, offset);
            offset = res.offset;
          }
        });
      }
      propertiesMask <<= 1;
    });
  }

  if (schema.objects) {
    Object.keys(schema.objects).forEach(function (objName) {
      if (obj[objName] !== undefined) {
        const res = encodeObject(obj[objName], null, schema.objects[objName], buffer, offset);
        offset = res.offset;
        propertiesMask |= 1;
      }
      propertiesMask <<= 1;
    });
  }

  if (schema.booleans) {
    let bools = 0;
    schema.booleans.forEach(function (key) {
      if (obj[key] !== undefined) {
        propertiesMask |= 1; // Indicate in the mast that the boolean is present
        bools |= +obj[key]; // Indicate its actual value
      }
      propertiesMask <<= 1;
      bools <<= 1;
    });
    // console.log("Encoding bool stuff at offset "+offset+" for size "+dv.byteLength);
    bools >>= 1;
    offset = encodeBytes(dv, offset, BINARY_CONFIG.booleanBytes, bools);
  }
  propertiesMask >>= 1;
  // console.log(propertiesMask.toString(2));
  dv['setUint' + BINARY_CONFIG.propertiesBytes * 8](headerOffset, propertiesMask); // Write the header byte

  const response = { buffer, offset };
  return response;
}

function encodeBytes(dv, offset, nbBytes, value) {
  dv['setInt' + nbBytes * 8](offset, value); // Signed to allow for negative values; use setUint for unsigned
  offset += nbBytes;
  return offset;
}

function encodeBigNumber(dv, offset, value) {
  dv.setBigUint64(offset, BigInt(value));
  offset += 8;
  return offset;
}

function encodeFloat(dv, offset, nbBytes, value) {
  // console.log('Encoding ',value,' at offset ',offset);
  dv['setFloat' + nbBytes * 8](offset, value); // Signed to allow for negative values; use setUint for unsigned
  offset += nbBytes;
  return offset;
}

function encodeString(dv, offset, str) {
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    // console.log(str.charAt(i)+', '+str.charCodeAt(i));
    dv['setUint' + BINARY_CONFIG.bytesPerChar * 8](offset, str.charCodeAt(i));
    offset += BINARY_CONFIG.bytesPerChar;
  }
}

/* ### DECODING ### */

/**
 * TODO when adding new types to schemas:
 * - Make sure they are counted in `countFields`
 * - Make sure they have a block in `decodeObject`
 */

export function getArrayBufferFromBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export function decodeSchemaName(data, redis = false) {
  const dv = new DataView(data);
  let offset = 0;
  const schemaID = dv.getInt8(offset);
  offset++;
  const schemas = redis ? redisSchemasList : schemasList;
  const schemaName = schemas[schemaID];
  return { offset, schemaName };
}

export function decode(data, schema, offset = 0) {
  // data is the binary object to decode
  // schema is the template of what to decode ; it indicates the names and types of the fields of the object, allowing to guide the decoding
  const res = decodeObject(data, offset, schema);
  return res.object;
}

function countFields(schema) {
  // Returns the total number of fields in the schema (regardless of being present in the object to decode or not)
  // This information is needed to properly read the properties mask, to know by how much to shif it (see isMaskTrue() )
  let nbFields = 0;
  if (schema.numbers !== undefined) nbFields += schema.numbers.length;
  if (schema.bignumbers !== undefined) nbFields += schema.bignumbers.length;
  if (schema.floats !== undefined) nbFields += schema.floats.length;
  if (schema.arrays !== undefined) nbFields += Object.keys(schema.arrays).length; // fields that are arrays of objects
  if (schema.objects !== undefined) nbFields += Object.keys(schema.objects).length; // fields that are objects (not in array or map)
  if (schema.strings !== undefined) nbFields += schema.strings.length;
  if (schema.booleans !== undefined) nbFields += schema.booleans.length;
  return nbFields;
}

export function decodeObject(pkg, offset, schema) {
  // pkg is the binary package to decode
  // offset is the offset, in bytes, at which the decoding has to start (recursive calls of decodeObject() work on the same bit sequence, but at different offsets)
  // on the first call the offset starts at 0, and is incremented each type bytes are read
  // schema is the template to use for the decoding
  const dv = new DataView(pkg);
  const object = {};

  /*
   * Read order :
   * - The mask that indicates what fields from the schema are present in the object
   * - The length of the string fields and the fields themselves
   * - The numerical fields
   * - The length of arrays of sub-objects and the arrays themselves
   * - The objects
   * - The booleans
   * */

  /* Recursive calls are used to decode nested objects ; they keep reading the same buffer at a different offset. No need to specify and end point, because the nested object
   * will be parsed according to the provided schema, thus only considering the relevan part of the rest of the buffer and effectively returning one the schema is exhausted. */

  const nbProperties = countFields(schema);
  // BINARY_CONFIG.propertiesBytes indicates how many bytes are required to make a mask for all the possible properties of the schema
  const propertiesMask = dv['getUint' + BINARY_CONFIG.propertiesBytes * 8](offset); // series of bits indicating the presence or absence of each field of the schema
  offset += BINARY_CONFIG.propertiesBytes;
  let idx = 1; // index of the next field that will be checked, use to shift the properties mask correctly in isMaskTrue()

  if (schema.strings) {
    schema.strings.forEach(function (key) {
      if (isMaskTrue(propertiesMask, nbProperties, idx)) {
        // Same process as for the numerical fields, but need to decode one additional byte to know the length of each string
        const length = dv.getUint8(offset);
        offset++;
        // console.log('Decoding ' + key + ' at offset ' + offset);
        object[key] = decodeString(dv, length, offset);
        offset += length * BINARY_CONFIG.bytesPerChar; // BINARY_CONFIG.bytesPerChar indicates how many bytes should be allocated to encode one character in a string
      }
      idx++;
    });
  }

  if (schema.numbers) {
    schema.numbers.forEach(function (key) {
      if (isMaskTrue(propertiesMask, nbProperties, idx)) {
        // check the properties mask to see if the field is present in the object or not, and therefore has to be decoded or skipped
        const nbBytes = BINARY_CONFIG.numberBytes;
        object[key] = dv['getInt' + nbBytes * 8](offset); // calls e.g. dv.getInt8, dv.getInt16 ... depending on how many bytes are indicated as necessary for the given field in the schema; use getUint8 etc. for unsigned values
        offset += nbBytes;
      }
      idx++;
    });
  }

  if (schema.bignumbers) {
    schema.bignumbers.forEach(function (key) {
      if (isMaskTrue(propertiesMask, nbProperties, idx)) {
        // check the properties mask to see if the field is present in the object or not, and therefore has to be decoded or skipped
        object[key] = Number(dv.getBigUint64(offset));
        offset += 8;
      }
      idx++;
    });
  }

  if (schema.floats) {
    schema.floats.forEach(function (key) {
      if (isMaskTrue(propertiesMask, nbProperties, idx)) {
        // check the properties mask to see if the field is present in the object or not, and therefore has to be decoded or skipped
        const nbBytes = BINARY_CONFIG.floatBytes;
        object[key] = parseFloat(dv['getFloat' + nbBytes * 8](offset).toFixed(BINARY_CONFIG.decimalPlaces)); // calls e.g. dv.getInt8, dv.getInt16 ... depending on how many bytes are indicated as necessary for the given field in the schema; use getUint8 etc. for unsigned values
        offset += nbBytes;
      }
      idx++;
    });
  }

  if (schema.arrays) {
    // Iterate over all lists of objetcs
    Object.keys(schema.arrays).forEach(function (arrayOfObjects) {
      // For each list, iterate over the its content
      if (isMaskTrue(propertiesMask, nbProperties, idx)) {
        const length = dv.getUint32(offset); // Number of objects in the array (length of the array)
        offset += 4; // 4 bytes for array size

        object[arrayOfObjects] = [];
        const sc = schema.arrays[arrayOfObjects]; // schema of the objects in the list
        for (let i = 0; i < length; i++) {
          // console.log("Decoding "+arrayOfObjects+" element at offset "+offset);
          let result;
          if (sc.primitive) {
            // is the object a "primitive" one (primitive flag set to true), decode it as the corresponding type, only ints covered here
            if (sc.type === 'int') {
              result = dv['getUint' + BINARY_CONFIG.numberBytes * 8](offset);
              offset += BINARY_CONFIG.numberBytes;
            } else if (sc.type === 'float') {
              result = parseFloat(dv['getFloat' + BINARY_CONFIG.floatBytes * 8](offset).toFixed(BINARY_CONFIG.decimalPlaces));
              offset += BINARY_CONFIG.floatBytes;
            }
          } else {
            // otherwise, recursive call to decodeObject() to decode the object in the list
            const res = decodeObject(pkg, offset, sc);
            result = res.object;
            offset = res.offset;
          }
          object[arrayOfObjects].push(result);
        }
      }
      idx++;
    });
  }

  if (schema.objects) {
    Object.keys(schema.objects).forEach(function (objName) {
      if (isMaskTrue(propertiesMask, nbProperties, idx)) {
        // console.log('Decoding '+objName+' at offset '+offset);
        const res = decodeObject(pkg, offset, schema.objects[objName]);
        object[objName] = res.object;
        offset = res.offset;
      }
      idx++;
    });
  }

  if (schema.booleans) {
    // console.log('Decoding bools at offset ' + offset);
    const bools = dv['getUint' + BINARY_CONFIG.booleanBytes * 8](offset); // just like propertiesMask, bools is a mask indicating the presence/absence of each boolean
    let boolidx = 1; // index of the next boolean to decode
    offset += BINARY_CONFIG.booleanBytes;
    schema.booleans.forEach(function (key) {
      if (isMaskTrue(propertiesMask, nbProperties, idx)) object[key] = !!isMaskTrue(bools, schema.booleans.length, boolidx); // !! converts to boolean
      idx++;
      boolidx++;
    });
  }
  return { object: object, offset: offset };
}

export function isMaskTrue(mask, nbProperties, idx) {
  // Process a bitmask to know if a specific field, at index idx, is present or not
  return (mask >> (nbProperties - idx)) & 1; // Shift right to put the target at position 0, and AND it with 1
}

export function decodeString(view, length, offset) {
  // Read length bytes starting at a specific offset to decode a string
  const chars = [];
  for (let i = 0; i < length; i++) {
    // @ts-ignore
    chars.push(String.fromCharCode(view['getUint' + BINARY_CONFIG.bytesPerChar * 8](offset)));
    offset += BINARY_CONFIG.bytesPerChar;
  }
  return chars.join('');
}
