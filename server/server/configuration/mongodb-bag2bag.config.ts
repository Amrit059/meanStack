import * as mongoose from 'mongoose';
import LOGGER from './winston';
const config = require('config');

/* mongodb configurations */
class MongooseConfig {
    constructor() {
        LOGGER.info('Inside mongodb configuration file')
    }
    init() {
        LOGGER.info('inside init');
        let dbConfig = config.get('appConfig.dbConfig');
        LOGGER.info('inside init before mongo connection');
        mongoose.connect(dbConfig.url);
        const db = mongoose.connection;
        LOGGER.info('inside init before mongo debug');
        mongoose.set('debug', true);
        db.on('error', (e) => {
            LOGGER.info('error while creating mongodb connection')
            LOGGER.error(e)
        })
        db.once('open', () => { LOGGER.info('MongoDB connection is created') })
    }
}
const mongoConfig = new MongooseConfig()
export default mongoConfig;