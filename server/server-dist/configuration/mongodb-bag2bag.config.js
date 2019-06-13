"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config = require('config');
class MongooseConfig {
    constructor() {
        console.log('Inside mongodb configuration file');
    }
    init() {
        let dbConfig = config.get('appConfig.dbConfig');
        mongoose.connect(dbConfig.url);
        const db = mongoose.connection;
        mongoose.set('debug', true);
        db.on('error', () => { console.log('error while creating mongodb connection'); });
        db.once('open', () => { console.log('MongoDB connection is created'); });
    }
}
const mongoConfig = new MongooseConfig();
exports.default = mongoConfig;
//# sourceMappingURL=mongodb-bag2bag.config.js.map