const _ = require('lodash');
// Realm game model data used by various consumer services
// these are only used by this consumer repo. For other shared constantsw and data we use shared_code/constants/const.game

// live reference to all spawned map alchemica resides here, this gets populated on server boot with GameManager.init
// GameManager also keeps it up-to-date with new spawn additions, 02-alcehmica-take keeps it up-to-date with confirmed spawn takes
// Example: SPAWNED_ALCHEMICA_BY_MAP_ID[MAP_ID_CITAADEL] returns an object hash of every spawned alchemica on that map by alchemica ID
// Example: SPAWNED_ALCHEMICA_BY_MAP_ID[MAP_ID_CITAADEL]['167091451923900001'] returns {"id":"167091451923900001","label":"fud","x":469698,"y":105012,"quantity":10}
export const SPAWNED_ALCHEMICA_BY_MAP_ID = {};

// default properties for alchemica config if no customizations are made
// this gets replaced by the latest data in the associated redis key and kept up-to-date by GameManager
export const ALCHEMICA_CONFIG = {
  // total available supply of each alchemica type: FUD, FOMO, ALPHA, KEK available to Realm to spawn
  // For CR0 / CR1 this is essentially a pre-mint allotment of alchemica to initiate the minting process on by having
  // realm spawn and gotchis pick up. Alchemica decrements as it's spawned and increments if alchemica goes back from gotchi pocket -> realm
  // note: for security this can only be configured by updating redis key `alchemica-config` directly on beta / prod
  realmSpawnAllocation: [0, 0, 0, 0],
  // Realm can optionally automatically spawn alchemica from `realmSpawnAllocation` at fixed rates using a built-in cron service
  // if using that service, daily UTC limits must be defined here
  // dailyAutoSpawnQuantityLimits: [500000, 250000, 108333, 50000],
  // temporary raised limits for close of CR1 event
  dailyAutoSpawnQuantityLimits: [519459, 259079, 199663, 54487],
  // define an array of cron intervals to auto spawn. Spawning in pairs as FUD / FOMO get .1 units but ALPHA/KEK do not. So we spawn each pair 30s apart
  autoSpawnCrons: ['1-19,21-39,41-59 * * * *', '30 1-19,21-39,41-59 * * * *', '0,20,40 * * * *', '30 0,20,40 * * * *'], // default small spawns every minute, except for every 20 minute mark do a big spawn
  // define the volume of alchemica to spawn at every spawn interval
  autoSpawnQuantities: [[277.7, 138.8, 0, 0], [0, 0, 60.1, 27.7], [1668.1, 835, 0, 0], [0, 0, 362.7, 168.1]],
  // The probability of spawning each of the 3 chunk sizes in a ratio from 1-0, sum should equal 1. Ex. 0.9 = 90% chance
  alchemicaChunkRatios: [[0, 0.8, 0.2], [0.9, 0.08, 0.02], [0, 0.8, 0.2], [0.5, 0.35, 0.15]],
  // Alchemica is currently designed to spawn at 3 preset sizes, define those here.
  // Note this can be different than GAME_CONFIG.alchemicaChunkSizes which is just the display sizes to tie to graphics and sounds
  alchemicaSpawnChunkSizes: [0.1, 0.5, 1],

  // keeps track of the utc daily auto spawn rate that has already spawned.
  dailyAutoSpawnQuantitiesSpawned: [0, 0, 0, 0],
  // the next few options are for alchemica spawn analytics and enforcement
  // all time quantity spawn for all alchemica types
  allTimeQuantitySpawned: 0,
  // all time quantity spawn for each alchemica type
  allTimeQuantitySpawnedByType: [0, 0, 0, 0],
  // all time chunks spawn for all alchemica types
  allTimeChunksSpawned: 0,
  // all time quantity spawn for each alchemica type
  allTimeChunksSpawnedByType: [0, 0, 0, 0],
  // last UTC date for spawn, used to track alchemica spawn burn down per day
  lastUTCSpawnDate: '',
  // tracks how much of the daily spawn limit has spawned. If utcDayQuantitySpawned >= dailyAutoSpawnQuantities the spawn will be skipped
  utcDayQuantitySpawned: 0,
  utcDayQuantitySpawnedByType: [0, 0, 0, 0],
  utcDayChunksSpawned: 0,
  utcDayChunksSpawnedByType: [0, 0, 0, 0],
  // recovered alchemica from shadow banned bots trying to widthrawl
  recoveredAlchemica: [0, 0, 0, 0],
  // counter for how many recoveries were made
  recoveredAlchemicaActionCount: 0,
  // counter for how many recovery refunds were made
  refundAlchemicaActionCount: 0,
  // track lifetime alchemica refunds
  refundedAlchemica: [0, 0, 0, 0],
  // track lifetime alchemica spawn pool increases by event type
  channelAlchemicaCounter: 0,
  channelAlchemicaQuantitiesAdded: [0, 0, 0, 0],
  channelAlchemicaQuantitiesSpilled: [0, 0, 0, 0],
  claimAlchemicaCounter: 0,
  claimAlchemicaQuantitiesAdded: [0, 0, 0, 0],
  claimAlchemicaQuantitiesSpilled: [0, 0, 0, 0],
  // track lifetime Player Wallet deposits and withdraw sums
  playerWalletDepositQuantities: {},
  playerWalletWithdrawQuantities: {},
  // lifetime tip count
  tipCount: 0,
  // lifetime tip quantities
  tipQuantities: {},
  // lifetime store purchases via Player Wallet
  storePurchaseTransactionCount: 0,
  storePurchaseItemsSoldCount: 0,
  storePurchaseTokensSpent: {},
  storePurchaseItemIdToSoldCount: {},
  storeItemUseCount: 0,
  storeItemUseByTypeCount: {},
  // lifetime quest burned alch
  questBurnedAlchemicaCounter: [0, 0, 0, 0],
  questBurnedAlchemicaQuantitiesAdded: 0,
  respawnBuybackCount: 0,
  respawnBuybackTokensSpent: {},
};
if (process.env.APP_ENV === 'local') {
  // on local we'll default to CR1 spawn amounts. On beta / prod this will need to be manually set for security
  ALCHEMICA_CONFIG.realmSpawnAllocation = [15000000, 7500000, 3250000, 1500000];
  ALCHEMICA_CONFIG.dailyAutoSpawnQuantityLimits = [500000, 250000, 108333, 50000];
}

// list of all global players on realm servers. GameManager loads this on boot and keeps it updated
export const PLAYERS_BY_ID = {};
// list of all global enemies on realm servers. GameManager loads this on boot and keeps it updated
export const ENEMIES_BY_ID = {};
export const MAP_SPAWNED_ITEMS_BY_ID = {};

// list of all installations installed on all parcels game wide. GameManager loads this on boot and keeps it updated
export const INSTALLATIONS_BY_ID = {};
export const INSTALLATIONS_BY_HOOD = {};

// list of all parcels by ID (tokenId)
export const PARCELS = require('../data/parcels.json');
export const PARCELS_BY_ID = _.keyBy(PARCELS, 'parcelId');
export const PARCELS_BY_TOKEN_ID = _.keyBy(PARCELS, 'tokenId');
export const ITEM_STORE_ITEMS_BY_ID = {};
