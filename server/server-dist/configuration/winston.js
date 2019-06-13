"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const path_1 = require("path");
const LOGS_FOLDER_PATH = path_1.join(process.cwd(), 'logs');
const options = {
    infoFile: {
        level: 'info',
        filename: `info.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    exceptionFile: {
        level: 'error',
        filename: `info.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const LOGGER = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    level: "debug",
    transports: [
        new winston.transports.File(options.infoFile),
    ],
    exceptionHandlers: [
        new winston.transports.File(options.exceptionFile),
    ]
});
if (process.env.NODE_ENV !== "production") {
    LOGGER.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
exports.default = LOGGER;
//# sourceMappingURL=winston.js.map