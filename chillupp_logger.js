const winston = require('winston');
const { transports, createLogger, format } = winston;
const fs = require('fs');
const path = require('path');
const logDir = path.join(__dirname,'../../logs');
const momentTz = require('moment-timezone');
const content_constants = require('../constants/content_constants');
const currentZone = content_constants.TIME_ZONE.ASIA_KOLKATA;
momentTz.tz.setDefault(currentZone);

/**
 * @author ForU
 */

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
} 
 
module.exports = class ChilluppLogger  {
    constructor() {
      this.logger = winston.createLogger({
        level: 'info',
        timestamp : () =>  momentTz().format(),
        exitOnError: false,
        transports: [
            new (require('winston-daily-rotate-file'))({
                filename: `${logDir}/logs.log`,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                level: 'silly',
                maxSize: '20m',
                maxFiles: '1d'
            }),
            new (require('winston-daily-rotate-file'))({
                filename: `${logDir}/errors.log`,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                level: 'error',
                maxSize: '20m',
                maxFiles: '1d'
            })
        ],
    });
    }
  };
  