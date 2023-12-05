

import { createLogger, format, transports } from "winston";
import dotenvConfig from "../config/dotenvConfig.js";

const {combine, printf, timestamp, colorize, prettyPrint } = format

const logDev = {
    level: 'debug', 
    format: combine(
        timestamp({
            format: 'DD-MMM-YYYY HH:mm'
        }),
        colorize(),
        printf((info)=> `${info.level} | ${info.timestamp} | ${info.message}`)
    ), 
    transports: [ 
        new transports.Console(),
        new transports.File({
            filename: './src/persistence/daos/fileSystem/logs/errors.log',
            level: 'error'
        })
    ]
}
const logProd = {
    level: 'info', 
    format: combine(
        timestamp({
            format: 'DD-MMM-YYYY HH:mm'
        }),
        colorize(),
        printf((info)=> `${info.level} || ${info.message}`)
    ), 
    transports: [ new transports.Console() ]
}
console.log('NODE_ENV:', dotenvConfig.NODE_ENV);
const selectedConfig = dotenvConfig.NODE_ENV == 'production' ? logProd : logDev;
//console.log('Selected Config:', selectedConfig);
//console.log('process.env:', process.env);

export const logger = createLogger(selectedConfig);

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
// };



