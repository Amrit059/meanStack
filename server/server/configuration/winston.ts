import * as winston from "winston";
import { join } from 'path';

const LOGS_FOLDER_PATH: string = join(process.cwd(), 'logs');

const options: any = {
  infoFile: {
    level: 'info',
    filename: `info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  exceptionFile: {
    level: 'error',
    filename: `exceptions.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
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

/*  instantiate a new Winston Logger with the settings defined above */
const LOGGER: winston.Logger = winston.createLogger({
    format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  level: "debug",
  transports: [
    new winston.transports.File(options.infoFile),
  ],
  exceptionHandlers: [
    new winston.transports.File(options.exceptionFile),
  ]
});

if (process.env.NODE_ENV !== "prod") {
  LOGGER.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default LOGGER;