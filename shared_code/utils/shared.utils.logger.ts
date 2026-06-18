import { createLogger, format, transports, config } from 'winston'
const { combine, timestamp, json, printf, errors } = format;
const os = require('os');
const util = require('util');

function expandArgs(args, colors) {
  return args
    .map((arg) => {
      return util.inspect(arg, {
        colors,
      });
    })
    .join(' ');
}

function getJSONFormat() {
  const combineMessageAndSplat = () => {
    return {
      transform: (info) => {
        const args = info[Symbol.for('splat')];
        info.message = String(info.message).slice(0, 10000);
        if (info.stack) {
          info.message += ` ${info.stack}`;
        }
        const strArgs = expandArgs(args || [], false);
        if (strArgs) {
          info.message += ` ${strArgs}`;
        }
        return info;
      },
    };
  };

  return combine(
    combineMessageAndSplat(),
    errors({ stack: true }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json()
  );
}

function getLogFormat() {
  let cliFormat = getJSONFormat();
  // @ts-ignore
  if (['local'].includes(process.env.APP_ENV)) {
    cliFormat = combine(
      format.cli(),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      // fix support for multiple console arguments, what Winston should have come with
      // but dubiously does not: https://github.com/winstonjs/winston/issues/1427
      printf((info) => {
        const timestamp = info.timestamp?.trim();
        const level = info.level;
        const message = (info.message || '').trim();
        // @ts-ignore
        const args = info[Symbol.for('splat')];
        const strArgs = expandArgs(args || [], true);
        return `[${timestamp}] ${level} ${message} ${strArgs}`;
      })
    );
  }
  return cliFormat;
}

const logTransports = [new transports.Console({ format: getLogFormat() })];
let _logger;

const logger = function(serviceName) {
  if (!_logger) {
    _logger = createLogger({
      level: 'info',
      levels: config.npm.levels,
      defaultMeta: { service: serviceName, hostname: os.hostname(), env: process.env.APP_ENV },
      transports: logTransports,
      exceptionHandlers: logTransports,
    });
  }
  return _logger;
};

export default logger