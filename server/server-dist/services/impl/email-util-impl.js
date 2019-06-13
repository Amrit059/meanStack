"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
require("reflect-metadata");
const config = require("config");
const inversify_1 = require("inversify");
const winston_1 = require("../../configuration/winston");
const https = require('https');
const MAIL_CONFIG = config.get('appConfig.mailConfig');
let EmailUtilImpl = class EmailUtilImpl {
    constructor() {
        console.log('Email Services called');
    }
    sendBookingMail(postData) {
        winston_1.default.info('inside sendBookingMail');
        let postOptions = this.createHeaderOptionForElasticEmailAPI(postData);
        return this.elasticEmailAPIHttpRequestHandler(postOptions);
    }
    createHeaderOptionForElasticEmailAPI(post_data) {
        winston_1.default.info('inside createHeaderOptionForElasticEmailAPI');
        const post_options = {
            host: MAIL_CONFIG.host,
            path: MAIL_CONFIG.path,
            method: MAIL_CONFIG.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };
        return post_options;
    }
    elasticEmailAPIHttpRequestHandler(post_options) {
        winston_1.default.info('inside elasticEmailAPIHttpRequestHandler');
        return rxjs_1.Observable.create((observer) => {
            try {
                winston_1.default.debug('Inside try block');
                https.request(post_options, function (res) {
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        console.log(`chunk is ${chunk}`);
                        observer.next('Mail sent successfully');
                    });
                    res.on('error', function (e) {
                        console.log(`Error: ${e.message}`);
                        observer.error(`Failed to send mail and msg is ${e.message}`);
                    });
                });
            }
            catch (e) {
                winston_1.default.error(`Error: ${e.message}`);
                observer.error(`Failed to send mail and msg is ${e.message}`);
            }
        });
    }
};
EmailUtilImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EmailUtilImpl);
exports.EmailUtilImpl = EmailUtilImpl;
//# sourceMappingURL=email-util-impl.js.map