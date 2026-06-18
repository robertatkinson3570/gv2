// @ts-nocheck
import {
  MAP_CONFIG_BY_ID,
  MAP_ID_CITAADEL,
  HOOD_ROWS_PER_ZONE,
  HOOD_COLS_PER_ZONE,
  ZONE_WIDTH,
  ZONE_HEIGHT,
  HOOD_COL_COUNT,
  HOOD_ROW_COUNT,
  ZONE_COL_COUNT,
  ZONE_ROW_COUNT,
  ZONE_ROW,
  ZONE_COL,
  ZONE_ID,
  HOODS_EXCLUSION,
  ENABLED_MAPS,
} from '../constants/const.game';
const _ = require('lodash');
import { getDistrictIdByHoodPos, valueInRange } from './shared.utils.map'

/**
 * Used by Realm servers to generate "zone" data based on server map configuration. Zone data is used to optimize data loading and syncing.
 *
 * @param {string}  mapId       the map ID to generate zone data for, ex "citaadel", should be one of ENABLED_MAPS
 */
export function calculateZoneData(mapId) {
  if (!_mapConfiguredForZones(mapId)) {
    return null;
  }

  const mapConfig = mapId && MAP_CONFIG_BY_ID[mapId];
  const aoiWidth = mapConfig.WIDTH / mapConfig.AOI_COL_COUNT;
  const aoiHeight = mapConfig.HEIGHT / mapConfig.AOI_ROW_COUNT;
  // each server instance belongs to a cluster that covers one region of the Realm map, aka a "zone". Zones are defined in units of hoods.
  // 1x1 would be just 1 hood per zone, we are currently set up for 4x1 zones meaning each cluster spans 4 horizontal districts, 1 vertical district deep
  // ZONE_ID, ZONE_ROW, ZONE_COL are always configured by process.env variable
  const ZONE = {
    ID: ZONE_ID,
    ROW: ZONE_ROW,
    COL: ZONE_COL,
    WIDTH: ZONE_WIDTH,
    HEIGHT: ZONE_HEIGHT,
  };
  // @ts-ignore
  ZONE.POS = {
    X: ZONE.COL * ZONE_WIDTH,
    Y: ZONE.ROW * ZONE_HEIGHT,
  };
  // calculate zone neighbors
  ZONE.BORDER_ZONE_IDS = {
    LEFT: ZONE.COL > 0 ? `${ZONE.ROW}_${ZONE.COL - 1}` : null,
    TOP_LEFT: ZONE.COL > 0 && ZONE.ROW > 0 ? `${ZONE.ROW - 1}_${ZONE.COL - 1}` : null,
    TOP: ZONE.ROW > 0 ? `${ZONE.ROW - 1}_${ZONE.COL}` : null,
    TOP_RIGHT: ZONE.COL < ZONE_COL_COUNT - 1 && ZONE.ROW > 0 ? `${ZONE.ROW - 1}_${ZONE.COL + 1}` : null,
    RIGHT: ZONE.COL < ZONE_COL_COUNT - 1 ? `${ZONE.ROW}_${ZONE.COL + 1}` : null,
    BOTTOM_RIGHT: ZONE.COL < ZONE_COL_COUNT - 1 && ZONE.ROW < ZONE_ROW_COUNT - 1 ? `${ZONE.ROW + 1}_${ZONE.COL + 1}` : null,
    BOTTOM: ZONE.ROW < ZONE_ROW_COUNT - 1 ? `${ZONE.ROW + 1}_${ZONE.COL}` : null,
    BOTTOM_LEFT: ZONE.COL > 0 && ZONE.ROW < ZONE_ROW_COUNT - 1 ? `${ZONE.ROW + 1}_${ZONE.COL - 1}` : null,
  };
  // pixel range that this server zone cluster is responsible for
  ZONE.BOUNDS = {
    LEFT: ZONE.POS.X,
    TOP: ZONE.POS.Y,
    RIGHT: ZONE.POS.X + ZONE.WIDTH,
    BOTTOM: ZONE.POS.Y + ZONE.HEIGHT,
  };
  // AOI row / column index bounds this server zone cluster is responsible for
  // AOI is zero-based so we subtract 1
  ZONE.BOUNDS_AOI = {
    LEFT: ZONE.BOUNDS.LEFT / aoiWidth,
    TOP: ZONE.BOUNDS.TOP / aoiHeight,
    RIGHT: Math.max(0, ZONE.BOUNDS.RIGHT / aoiWidth - 1),
    BOTTOM: Math.max(0, ZONE.BOUNDS.BOTTOM / aoiHeight - 1),
  };
  // add 1 AOI row/col into neighboring ranges for content preload
  ZONE.BOUNDS_EXTENDED = {
    LEFT: ZONE.BOUNDS.LEFT - (ZONE.BORDER_ZONE_IDS.LEFT ? aoiWidth : 0),
    TOP: ZONE.BOUNDS.TOP - (ZONE.BORDER_ZONE_IDS.TOP ? aoiHeight : 0),
    RIGHT: ZONE.BOUNDS.RIGHT + (ZONE.BORDER_ZONE_IDS.RIGHT ? aoiWidth : 0),
    BOTTOM: ZONE.BOUNDS.BOTTOM + (ZONE.BORDER_ZONE_IDS.BOTTOM ? aoiHeight : 0),
  };
  // calculate all districts / hoods covered by this server
  ZONE.DISTRICT_IDS = [];
  ZONE.HOOD_IDS = [];
  // hoods are 1 based indexes, hence we +1
  for (let hoodXIndex = ZONE.COL * HOOD_COLS_PER_ZONE + 1; hoodXIndex < ZONE.COL * HOOD_COLS_PER_ZONE + HOOD_COLS_PER_ZONE + 1; hoodXIndex++) {
    for (let hoodYIndex = ZONE.ROW * HOOD_ROWS_PER_ZONE + 1; hoodYIndex < ZONE.ROW * HOOD_ROWS_PER_ZONE + HOOD_ROWS_PER_ZONE + 1; hoodYIndex++) {
      // hoods are in x,y point format where X goes first,FYI it's also 1 based
      ZONE.HOOD_IDS.push(`C${hoodXIndex}${hoodYIndex}`);
      ZONE.DISTRICT_IDS.push(getDistrictIdByHoodPos(hoodXIndex, hoodYIndex));
    }
  }
  // calculate all active hoods that border this server's hoods
  ZONE.BORDER_HOOD_IDS = [];
  ZONE.BORDER_DISTRICT_IDS = [];
  for (let hoodXIndex = ZONE.COL * HOOD_COLS_PER_ZONE; hoodXIndex < ZONE.COL * HOOD_COLS_PER_ZONE + HOOD_COLS_PER_ZONE + 2 && hoodXIndex < HOOD_COL_COUNT + 1; hoodXIndex++) {
    for (let hoodYIndex = ZONE.ROW * HOOD_ROWS_PER_ZONE; hoodYIndex < ZONE.ROW * HOOD_ROWS_PER_ZONE + HOOD_ROWS_PER_ZONE + 2 && hoodYIndex < HOOD_ROW_COUNT + 1; hoodYIndex++) {
      const borderHood = `C${hoodXIndex}${hoodYIndex}`;
      if (!ZONE.HOOD_IDS.includes(borderHood) && !HOODS_EXCLUSION.includes(borderHood)) {
        const borderDistrict = getDistrictIdByHoodPos(hoodXIndex, hoodYIndex);
        if (borderDistrict) {
          ZONE.BORDER_HOOD_IDS.push(borderHood);
          ZONE.BORDER_DISTRICT_IDS.push(borderDistrict);
        }
      }
    }
  }
  return ZONE;
}

// private method to determine if the current map both supports zones and is configured for them
// this leverages process.env vars from const.game.js from the parent project loading shared_code
function _mapConfiguredForZones(mapId) {
  const mapConfig = mapId && MAP_CONFIG_BY_ID[mapId];
  const isEnabledMap = mapConfig && ENABLED_MAPS.includes(mapId);
  // Currently zone data is only required and used by the "citaadel" map which is large enough to need to be split up into map region based server clusters
  const mapSupportsZones = isEnabledMap && mapId === MAP_ID_CITAADEL;
  const mapIsConfiguredForZones = mapSupportsZones && HOOD_ROWS_PER_ZONE < HOOD_ROW_COUNT && HOOD_COLS_PER_ZONE < HOOD_COL_COUNT;
  return mapIsConfiguredForZones;
}

/**
 * Used by Realm servers that are leveraging map zones to group loading game objects by map position in relation to the server's local zone coverage area
 *
 * @param {object}  ZONE      the specific zone boundry data against this map to use for grouping, see calculateZoneData
 * @param {object}  objects   the objects to group, ex Players or Alchemica, passed as an object dictionary by ID, like PlayersById
 * @param {string}  posProp   If the object's x,y props are nested, pass the property name that contains x,y
 * @param {boolean} addProp   add a "zoneRel" prop to each object returned containing "zone", "border" or "outside"
 * @return {object} Returns   an object with all objects grouped into 3 arrays key'd by relationship to the server zone
 *  key "zone" = objects with positions that fall within the server's zone
 *  key "border" = objects with positions that fall within the server's border (1 AOI row/col into surrounding zones)
 *  key "outside" = objects with positions that fall completely outside of this server's zone or border
 */
export function groupObjectsByZoneRelation(ZONE, objects, posProp?, addProp?) {
  const objectsByMapZone = _.groupBy(objects, function (object) {
    return getObjectZoneRelation(ZONE, object, posProp, addProp);
  });

  // populate any empty keys
  if (!objectsByMapZone.zone) {
    objectsByMapZone.zone = [];
  }
  if (!objectsByMapZone.border) {
    objectsByMapZone.border = [];
  }
  if (!objectsByMapZone.outside) {
    objectsByMapZone.outside = [];
  }
  return objectsByMapZone;
}

// same as above except called for an individual object
export function getObjectZoneRelation(ZONE, object, posProp?, addProp?) {
  let zoneRel = 'zone';
  if (ZONE) {
    const boundsExtended = ZONE?.BOUNDS_EXTENDED;
    const bounds = ZONE?.BOUNDS;
    const objX = posProp ? object[posProp].x : object.x;
    const objY = posProp ? object[posProp].y : object.y;
    const xInExtended = valueInRange(objX, boundsExtended.LEFT, boundsExtended.RIGHT);
    const yInExtended = valueInRange(objY, boundsExtended.TOP, boundsExtended.BOTTOM);
    const objectInExtended = xInExtended && yInExtended;
    const xInZone = xInExtended && valueInRange(objX, bounds.LEFT, bounds.RIGHT);
    const yInZone = yInExtended && valueInRange(objY, bounds.TOP, bounds.BOTTOM);
    const objectInZone = xInZone && yInZone;
    zoneRel = objectInZone ? 'zone' : objectInExtended ? 'border' : 'outside';
  }
  if (addProp) {
    object.zoneRel = zoneRel;
  }
  return zoneRel;
}

/**
 * Used by Realm servers to granularly subscribe to only specific Redis pub/sub events that matter to that server based on local server map and map zone config
 * This is done via redis "psubscribe" glob patterns: https://redis.io/commands/psubscribe/. See counterpart publishEventForMap below
 * Use case: We have different maps (Citaadel and Battle Arena) running in env and want to subscribe to activity relative to just the map a server has loaded
 * Use case: Large maps are split into sub map region server clusters and these only want to listen to certain game lifecycle events relative to that map region
 *
 * @param {Redis}   redisSubscriber   an IORedis instance to do the subscribing with
 * @param {string}  channel           the base pub/sub channel name we are subscribing, ex. player "enter" events
 * @param {string}  mapId             optionally filter channel sub to only a certain map like "citaadel". Pass null to listen globally
 * @param {object}  ZONE              optionally filter channel sub to a map subdivision aka "zone", only currently supported for huge "citaadel" map
 *                                    the zone object is generated by calculateZoneData above. Pass null if your map does not support or is not configured for zones
 * @param {boolean} syncFullNeighbors when "zone" is passed, one AOI row/col into surrounding zones is also automatically subscribed for seamless client server zone to
 *                                    server zone transfer. In certain cases we want to sync full neighboring zone activity for this channel, if so, pass true
 */
export function addPubSubListenersForMap(redisSubscriber, channel, mapId, ZONE?, syncFullNeighbors?) {
  const mapIdToSync = mapId || '*';
  const zoneIdToSync = ZONE?.ID || '*';
  const pSubscribes = [];
  // subscribe to all channel updates impacting the main map zone (if no map we fallback to all maps, if no zone we fallback to all zones)
  pSubscribes.push(`${channel}.m_${mapIdToSync}.z${zoneIdToSync}.*`);
  // if the map is passing a ZONE we know it has zones enabled
  if (ZONE) {
    // most zone listeners don't listen to full neighboring zones, just 1 AOI row/col into them. .x and .y values are not pixel values but map AOI row/col indexes
    if (!syncFullNeighbors) {
      // 1 full AOI columns into the zone to the left
      if (ZONE.BORDER_ZONE_IDS.LEFT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.LEFT}.x${ZONE.BOUNDS_AOI.LEFT - 1}.y*`);
      // 1 combination AOI row/col into zone to top left
      if (ZONE.BORDER_ZONE_IDS.TOP_LEFT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.TOP_LEFT}.x${ZONE.BOUNDS_AOI.LEFT - 1}.y${ZONE.BOUNDS_AOI.TOP - 1}`);
      // 1 full AOI row into the zone to the north, etc
      if (ZONE.BORDER_ZONE_IDS.TOP) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.TOP}.x*.y${ZONE.BOUNDS_AOI.TOP - 1}`);
      if (ZONE.BORDER_ZONE_IDS.TOP_RIGHT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.TOP_RIGHT}.x${ZONE.BOUNDS_AOI.RIGHT + 1}.y${ZONE.BOUNDS_AOI.TOP - 1}`);
      if (ZONE.BORDER_ZONE_IDS.RIGHT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.RIGHT}.x${ZONE.BOUNDS_AOI.RIGHT + 1}.y*`);
      if (ZONE.BORDER_ZONE_IDS.BOTTOM_RIGHT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.BOTTOM_RIGHT}.x${ZONE.BOUNDS_AOI.RIGHT + 1}.y${ZONE.BOUNDS_AOI.BOTTOM + 1}`);
      if (ZONE.BORDER_ZONE_IDS.BOTTOM) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.BOTTOM}.x*.y${ZONE.BOUNDS_AOI.BOTTOM + 1}`);
      if (ZONE.BORDER_ZONE_IDS.BOTTOM_LEFT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.BOTTOM_LEFT}.x${ZONE.BOUNDS_AOI.LEFT - 1}.y${ZONE.BOUNDS_AOI.BOTTOM + 1}`);
    } else {
      if (ZONE.BORDER_ZONE_IDS.LEFT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.LEFT}.*`);
      if (ZONE.BORDER_ZONE_IDS.TOP_LEFT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.TOP_LEFT}.*`);
      if (ZONE.BORDER_ZONE_IDS.TOP) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.TOP}.*`);
      if (ZONE.BORDER_ZONE_IDS.TOP_RIGHT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.TOP_RIGHT}.*`);
      if (ZONE.BORDER_ZONE_IDS.RIGHT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.RIGHT}.*`);
      if (ZONE.BORDER_ZONE_IDS.BOTTOM_RIGHT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.BOTTOM_RIGHT}.*`);
      if (ZONE.BORDER_ZONE_IDS.BOTTOM) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.BOTTOM}.*`);
      if (ZONE.BORDER_ZONE_IDS.BOTTOM_LEFT) pSubscribes.push(`${channel}.m_${mapIdToSync}.z${ZONE.BORDER_ZONE_IDS.BOTTOM_LEFT}.*`);
    }
  }
  _.each(pSubscribes, (psub) => redisSubscriber.psubscribe(psub));
  // console.log(`@@@@@ PSUBS for map "${mapId}" - zone ${ZONE?.ID || 'none'}`, pSubscribes);
}

/**
 * Used by Realm servers and other BE services to publish Redis pub/sub events relative to certain maps and map zones. See counterpart addPubSubListenersForMap above
 * Events include everything frmo players entering, leaving, position updates, health changes, alchemica spawns--everything that is relative to one map world
 *
 * @param {Redis}   redisPublisher  an IORedis instance to do the publishing from, note that per IORedis pub and sub need to always be 2 separate instances
 * @param {string}  mapId           the map the event is being dispatched for, EG "citaadel"
 * @param {string}  channel         the base pub/sub channel name we are subscribing, ex. player "enter" events
 * @param {number}  x               the originating map x pixel for event, pass null for a global map event. Used to calculate event AOI index and zone if configured
 * @param {number}  y               the originating map y pixel for event, pass null for a global map event. Used to calculate event AOI index and zone if configured
 * @param {data}    data            the payload object to pass with the publishing event, don't stringify that is done automatically by this method
 * @param {boolean} isBinary        pass true to binary encode the message, only a few heavy / frequently dispatched events leverage this optimization
 */
export async function publishEventForMap(redisPublisher, mapId, channel, x, y, data, isBinary = false) {
  // note we are using Number.isNaN and not isNaN to avoid coerced type checking as we allow null
  if (Number.isNaN(x) || Number.isNaN(y) || !mapId) {
    console.warn(`publishEventForMap x,y values are NAN or mapId invalid! channel: "${channel}" x: ${x} y: ${y} mapId: "${mapId}" payload: ${JSON.stringify(data || {})}`);
    return;
  }
  const mapHasZones = _mapConfiguredForZones(mapId);
  const isGlobalMapMessage = x === null && y === null;
  let zoneId, channelName, aoiX, aoiY;
  if (!mapHasZones) {
    // if the map doesn't have zones then we don't need to populate z,x,y as those are only needed for zone border subscriptions which aren't a thing in this scenario
    channelName = `${channel}.m_${mapId}.z.x.y`;
    await redisPublisher.publish(channelName, isBinary ? data : JSON.stringify(data));
  } else {
    // calculate the map specific zone ID using the x,y position passed, if none is passed there is no zone, it's a global event for a map
    zoneId = isGlobalMapMessage ? '' : getMapZoneByPosition(mapId, x, y)?.id;
    // then convert to AOI col/row index
    const mapConfig = MAP_CONFIG_BY_ID[mapId];
    const aoiWidth = mapConfig.WIDTH / mapConfig.AOI_COL_COUNT;
    const aoiHeight = mapConfig.HEIGHT / mapConfig.AOI_ROW_COUNT;
    aoiX = x ? Math.floor(x / aoiWidth) : '';
    aoiY = y ? Math.floor(y / aoiHeight) : '';
    channelName = `${channel}.m_${mapId}.z${zoneId}.x${aoiX}.y${aoiY}`;
    await redisPublisher.publish(channelName, isBinary ? data : JSON.stringify(data));
  }
  // console.log(`publishEventForMap "${mapId}" zone: ${zoneId || 'none'} channel: ${channelName}, isGlobal: ${isGlobalMapMessage}`, aoiX, aoiY, data);
}

// given an x,y position returns the zone server cluster responsible for the map area
export function getMapZoneByPosition(mapId, x, y) {
  const mapHasZones = _mapConfiguredForZones(mapId);
  if (!mapHasZones || (!x && !y)) {
    return {
      id: '0_0',
      row: 0,
      col: 0,
    };
  } else {
    const minCol = Math.max(0, Math.floor(x / ZONE_WIDTH));
    const minRow = Math.max(0, Math.floor(y / ZONE_HEIGHT));
    const col = Math.min(minCol, ZONE_COL_COUNT - 1);
    const row = Math.min(minRow, ZONE_ROW_COUNT - 1);
    return {
      id: `${row}_${col}`,
      row,
      col,
    };
  }
}
