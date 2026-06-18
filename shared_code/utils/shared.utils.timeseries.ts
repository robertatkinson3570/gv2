export default class TimeSeries {

  redisTs:any = {};
  logger = console;
  NFT_VIEW_LIMITER_KEY_SUFFIX = 'nft_last_viewed';
  PARCEL_COLLISION_COUNT_LIMITER_KEY_SUFFIX = 'parcel_last_coll';
  MAX_VIEW_COLLISION_INTERVAL_SEC = 3600; // one hour in seconds

  static instance: TimeSeries;

  public static getInstance(): TimeSeries {
    if (!TimeSeries.instance) {
      TimeSeries.instance = new TimeSeries();
    }
    return TimeSeries.instance;
  }

  constructor() {}

  init(redisStack, loggerObj) {
    this.redisTs = redisStack;
    this.logger = console;
    if (loggerObj) {
      this.logger = loggerObj;
    }
  }

  private _validateInputParams(timeSeriesKey, value) {
    return timeSeriesKey !== undefined && value !== undefined;
  }

  private _flattenLabels(labelsObj) {
    if (!labelsObj) {
      return [];
    }

    const labels = Object.keys(labelsObj);
    const flatLabels = ['LABELS'];

    labels.forEach((label) => {
      flatLabels.push(label, labelsObj[label]);
    });
    return flatLabels;
  }

  private _flattenLabelsForEqualsFiltering(timeSeriesKey, labelsObj?) {
    if (!labelsObj) {
      return [];
    }

    const labels = Object.keys(labelsObj);
    const flatLabelsForFiltering = ['WITHLABELS', 'FILTER', `type=${timeSeriesKey}`];

    labels.forEach((label) => {
      flatLabelsForFiltering.push(`${label}=${labelsObj[label]}`);
    });
    return flatLabelsForFiltering;
  }

  private async _incrDecrBy(isIncr = true, timeSeriesKey, labelsObj = null, value = 1, timestamp = null) {
    // TS.INCR[/DECR]BY key value [TIMESTAMP timestamp] RETENTION retentionPeriod] [UNCOMPRESSED] [CHUNK_SIZE size] [LABELS {label value}...]
    if (!this._validateInputParams(timeSeriesKey, value)) {
      this.logger.error("TimeSeries.incrby: No timeSeriesKey and/or measurement passed, can't log value.  Returning!");
      return;
    }

    const flatLabels = this._flattenLabels(labelsObj);

    const args = [timeSeriesKey, value, timestamp || '*', 'RETENTION', 0].concat(flatLabels);
    try {
      await this.redisTs.call(isIncr ? 'TS.INCRBY' : 'TS.DECRBY', args);
    } catch (err) {
      this.logger.error(`timeSeries _incrDecrBy: redis error doing isIncr ? 'TS.INCRBY' : 'TS.DECRBY' for ${timeSeriesKey} -> ${err.message}`);
    }
  }

  /**
   * Summary. Add a measurement to a time series.
   *
   * Description. Adds a measurement to a timeseries; creating said time series if it doesn't yet exist.  Maps to redis time series TS.ADD command: https://redis.io/commands/ts.add/ , but handles appending the label values to the timeSeriesKey for you.
   *
   * Usage: timeSeries.add("parcel_collision", 1, {parcel_id:"XYZ"});
   *
   * @class
   *
   * @param {String}    timeSeriesKey         Your time series key in snake_case, with whatever additional keys are desired after colons, e.g. location, e.g. `temperature:08750`
   * @param {any}       measurement           Current value to save to your time series, e.g. `72`.
   * @param {Object}    [labelsObj=null]      Labels for your measurement (snake_case names) - e.g. to log the temperature from sensor 3 in zip code 08750, you could pass `{"sensor":3, "zip_code":08750}`
   * @param {Number}    [timestamp=null]      The timestamp of your measurement.  Pass nothing and the current timestamp will be recorded (which is what you usually want).
   * @param {String}    [onDuplicate=LAST]    What to do for this time series if a duplicate (same key, timestamp, and label values) is sent.  Valid values documented here: https://redis.io/commands/ts.add/.  Defaults to "LAST" meaning - keep that which was most recently added.
   * @return null
   */
  public add = async function (timeSeriesKey, measurement, labelsObj:any = null, timestamp = null, onDuplicate = 'LAST') {
    // TS.ADD key timestamp value [RETENTION retentionPeriod] ENCODING [COMPRESSED|UNCOMPRESSED]] [CHUNK_SIZE size] [ON_DUPLICATE policy] [LABELS {label value}...]
    if (!this._validateInputParams(timeSeriesKey, measurement)) {
      this.logger.error("TimeSeries.add: No timeSeriesKey and/or measurement passed, can't log measurement.  Returning!");
      return;
    }

    const flatLabels = this._flattenLabels(labelsObj);

    const args = [timeSeriesKey, timestamp || '*', measurement, 'RETENTION', 0, 'ON_DUPLICATE', onDuplicate].concat(flatLabels);
    try {
      await this.redisTs.call('TS.ADD', args);
    } catch (err) {
      this.logger.error(`timeSeries add: redis error doing TS.ADD for ${timeSeriesKey} -> ${err.message}`);
    }
  };

  /**
   * Summary. Increase the value of a sample.
   *
   * Description. Increase the value of the sample with the maximum existing timestamp, or create a new sample with a value equal to the value of the sample with the maximum existing timestamp with a given increment.  Maps to redis time series TS.INCRBY command: https://redis.io/commands/ts.incrby/ , but handles appending the label values to the timeSeriesKey for you.
   *
   * @class
   *
   * @param {String}    timeSeriesKey         Your time series key in snake_case, e.g. `temperature`.
   * @param {Object}    [labelsObj=null]      Labels for your measurement (snake_case names) - e.g. to log the temperature from sensor 3 in zip code 08750, you could pass `{"sensor":3, "zip_code":08750}`
   * @param {Number}    [value=1]             Value by which to increment the sample, e.g. `10`.
   * @param {Number}    [timestamp=null]      The timestamp of your measurement.  Pass nothing and the increment will be applied to the most recent timestamp for the sample.
   * @return null
   */
  public incrBy = async function (timeSeriesKey, labelsObj:any = null, value = 1, timestamp = null) {
    return await this._incrDecrBy(true, timeSeriesKey, labelsObj, value, timestamp);
  };

  /**
   * Summary. Decrease the value of a sample.
   *
   * Description. Decrease the value of the sample with the maximum existing timestamp, or create a new sample with a value equal to the value of the sample with the maximum existing timestamp with a given decrement.  Maps to redis time series TS.INCRBY command: https://redis.io/commands/ts.decrby/
   *
   * @class
   *
   * @param {String}    timeSeriesKey         Your time series key in snake_case, e.g. `temperature:32080`.
   * @param {Object}    [labelsObj=null]      Labels for your measurement (snake_case names) - e.g. to log the temperature from sensor 3 in zip code 08750, you could pass `{"sensor":3, "zip_code":08750}`
   * @param {Number}    [value=1]             Value by which to decrement the sample, e.g. `10`.
   * @param {Number}    [timestamp=null]      The timestamp of your measurement.  Pass nothing and the decrement will be applied to the most recent timestamp for the sample.
   * @return null
   */
  public decrBy = async function (timeSeriesKey, labelsObj:any = null, value = 1, timestamp = null) {
    return await this._incrDecrBy(false, timeSeriesKey, labelsObj, value, timestamp);
  };

  /**
   * Summary. Get the latest value of a timeseries
   *
   * Description. Get the latest value of a timeseries for a given set of labels.  If there is no timeseries, returns empty
   *
   * @class
   *
   * @param {String}    timeSeriesKey         Your time series key in snake_case, e.g. `temperature:32080`.
   * @param {Object}    [labelsObj=null]      Labels for your measurement (snake_case names) - e.g. to log the temperature from sensor 3 in zip code 08750, you could pass `{"sensor":3, "zip_code":08750}`
   * @return {String}   Latest value from the timeseries
   */
  public get = async function (timeSeriesKey) {
    // TS.ADD key timestamp value [RETENTION retentionPeriod] ENCODING [COMPRESSED|UNCOMPRESSED]] [CHUNK_SIZE size] [ON_DUPLICATE policy] [LABELS {label value}...]
    if (!timeSeriesKey) {
      this.logger.error("TimeSeries.add: No timeSeriesKey passed, can't get sample.  Returning!");
      return;
    }

    const args = [timeSeriesKey];
    try {
      const result = await this.redisTs.call('TS.GET', args);
      return result[1];
    } catch (err) {
      if (err.message?.indexOf('the key does not exist') === -1) {
        this.logger.error(`timeSeries get: redis error doing TS.GET ${timeSeriesKey} -> ${err.message}`);
      }
    }
    return 0;
  };

  /**
   * Summary. Get values of a timeseries
   *
   * Description. Get values of a timeseries for a given set of labels, using the equivalence operator on name/value pairs in labelsObj.
   *
   * @class
   *
   * @param {Object}    [labelsObj=null]      Labels upon which to filter (snake_case names)
   * @return {Object}   The latest samples matching the filter
   */
  public mGet = async function (labelsObj = null) {
    type ResponseItem = {
      attrs:any, result:{timestamp:Number, value:String}
    }
    const args = this._flattenLabelsForEqualsFiltering(labelsObj);

    const responseObj:ResponseItem[]= [];
    try {
      const result = await this.redisTs.call('TS.MGET', args);
      result.forEach((item) => {
        const responseItem:ResponseItem = { attrs: {}, result: {timestamp:0, value:""} };
        item[1].forEach((attributesItem) => {
          responseItem.attrs[attributesItem[0]] = attributesItem[1];
        });

        responseItem.result.timestamp = item[2][0];

        responseItem.result.value = item[2][1];

        responseObj.push(responseItem);
      });
      return responseObj;
    } catch (err) {
      this.logger.error(`timeSeries mGet: redis error doing TS.MGET -> ${err.message}`);
      return {};
    }
  };

  /**
   * Summary. Get values of a timeseries, passing args directly through to this.redisTs.
   *
   * Description. Get values of a timeseries for a given set of labels.  If there is no timeseries, returns empty. This method exists to allow the full strength of the TS.MGET command as there are too many options to abstract.
   *
   * @class
   *
   * @param {Array}    args        Your raw args for TS.MGET per https://redis.io/commands/ts.mget/
   * @return {Array}   Raw redis response array with the latest samples matching the args per https://redis.io/commands/ts.mget/
   */
  public mGetRaw = async function (args = []) {
    if (!args) {
      this.logger.error('TimeSeries.mGetRaw: No args passed.  Returning!');
      return;
    }
    try {
      const result = await this.redisTs.call('TS.MGET', args);
      return result;
    } catch (err) {
      this.logger.error(`timeSeries mGetRaw: redis error doing TS.MGET -> ${err.message}`);
    }
  };

  /**
   * Summary. Get values of a timeseries
   *
   * Description. Get value of a timeseries for a given set of labels.  If there is no timeseries, returns empty
   *
   * @class
   *
   * @param {String}    args        your raw args for TS.MRANGE - not even gonna try to abstract this one!  see https://redis.io/commands/ts.mrange/ - example "- + test_parcel_collision WITHLABELS AGGREGATION sum 100000000000000 FILTER parcel_id=CR_FOO_BAR GROUPBY type REDUCE sum"
   * @return {Array}  raw redis response per https://redis.io/commands/ts.mrange/
   */
  public mRangeRaw = async function (args = []) {
    if (!args) {
      this.logger.error('TimeSeries.mRange: No args passed.  Returning!');
      return;
    }
    try {
      const result = await this.redisTs.call('TS.MRANGE', args);
      return result;
    } catch (err) {
      this.logger.error(`timeSeries mGetRaw: redis error doing TS.MRANGE -> ${err.message}`);
    }
  };

  /**
   * Summary. Delete a timeseries
   *
   * Description. delete a timeseries
   *
   * @class
   *
   * @param {String}    timeSeriesKey         Your time series key in snake_case, e.g. `temperature`.
   * @return null
   */
  public del = async function (timeSeriesKey) {
    if (!timeSeriesKey) {
      this.logger.error("TimeSeries.del: No timeSeriesKey and/or measurement passed, can't log measurement.  Returning!");
      return;
    }
    try {
      await this.redisTs.call('DEL', timeSeriesKey);
    } catch (err) {
      this.logger.error(`timeSeries del: redis error doing DEL -> ${err.message}`);
    }
  };

  /* handy metric helper methods */
  public metrics = {

    addParcelCollision : async (network, parcelId, gotchiId) => {
      const limiterKey = `${this.PARCEL_COLLISION_COUNT_LIMITER_KEY_SUFFIX}:${network}:${parcelId}:${gotchiId}`;
      const parcelCollLimitKeyExists = await this.redisTs.exists(limiterKey);
      if (!parcelCollLimitKeyExists) {
        await Promise.allSettled([this.incrBy(`parcel_collision:${network}:${parcelId}`, { type: 'parcel_collision', parcel_id: parcelId, network: network }), this.redisTs.set(limiterKey, 1, 'ex', this.MAX_VIEW_COLLISION_INTERVAL_SEC)]);
      }
    },

    resetParcelCollisionCt : async (network, parcelId) => {
      await this.add(`parcel_collision:${parcelId}`, 0, { type: 'parcel_collision', parcel_id: parcelId, network: network });
    },


    getParcelCollisionCount : async (network, parcelId) => {
      const ct = await this.get(`parcel_collision:${network}:${parcelId}`);
      return ct;
    },

    addNFTDisplayView : async (network, installationId, nftDisplayId, gotchiId) => {
      const limiterKey = `${this.NFT_VIEW_LIMITER_KEY_SUFFIX}:${network}:${installationId}:${nftDisplayId}:${gotchiId}`;
      const nftViewLimitKeyExists = await this.redisTs.exists(limiterKey);
      if (!nftViewLimitKeyExists) {
        await Promise.allSettled([this.incrBy(`nft_display_view:${network}:${installationId}:${nftDisplayId}`, { type: 'nft_display_view', nft_display_id: nftDisplayId, network: network, installation_id: installationId }), this.redisTs.set(limiterKey, 1, 'ex', this.MAX_VIEW_COLLISION_INTERVAL_SEC)]);
      }
    },

    resetNFTDisplayViews : async (network, installationId, nftDisplayId) => {
      await this.add(`nft_display_view:${network}:${installationId}:${nftDisplayId}`, 0, { type: 'nft_display_view', nft_display_id: nftDisplayId, network: network, installation_id: installationId });
    },

    getNFTDisplayViews : async (network, installationId, nftDisplayId) => {
      const ct = await this.get(`nft_display_view:${network}:${installationId}:${nftDisplayId}`);
      return ct;
    },

    addParcelEventCount : async (network, eventId, count = 1) => {
      await this.incrBy(`parcel_event_joined:${network}:${eventId}`, { type: 'parcel_event_joined', event_id: eventId, network: network }, count);
    },

    subtractParcelEventCount : async (network, eventId, count = 1) => {
      await this.decrBy(`parcel_event_joined:${network}:${eventId}`, { type: 'parcel_event_joined', event_id: eventId, network: network }, count);
      const curVal = await this.metrics.getParcelEventCount(network, eventId);
      if (parseInt(curVal) < 0) {
        // correct if it went below 0 somehow

        await this.metrics.addParcelEventCount(network, eventId, Math.abs(curVal));
      }
    },

    resetParcelEventCount : async (network, eventId) => {
      const curVal = await this.metrics.getParcelEventCount(network, eventId);
      if (curVal) {

        await this.metrics.subtractParcelEventCount(network, eventId, curVal);
      }
    },

    getParcelEventCount : async (network, eventId) => {
      const ct = await this.get(`parcel_event_joined:${network}:${eventId}`);
      return ct;
    },
  };
};
