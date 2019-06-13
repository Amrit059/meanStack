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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../configuration/types");
require("reflect-metadata");
const winston_1 = require("../configuration/winston");
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    register(app) {
        winston_1.default.info('Inside registered !');
        app.post('/rest/admin/api/emails/send/booking/mail/to/customer-care/by/:bookingId', this.sendBookingEmailToCustomerCare.bind(this));
        app.post('/rest/admin/api/emails/send/booking/mail/to/all/by/:bookingId', this.sendBookingEmailToAll.bind(this));
        app.post('/rest/admin/api/emails/send/booking/mail/to/hotel-vendor/by/:bookingId', this.sendBookingEmailToHotelVendor.bind(this));
        app.post('/rest/admin/api/emails/send/booking/mail/to/customer/by/:bookingId', this.sendBookingEmailToCustomerAndCustomerCare.bind(this));
    }
    sendBookingEmailToCustomerCare(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToCustomerCare(bookingId).subscribe((result) => {
            res.send(result);
        }, (error) => {
            winston_1.default.error(error);
            res.send('error');
        });
    }
    sendBookingEmailToHotelVendor(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToHotelVendor(bookingId).subscribe((data) => {
            res.send(data);
        }, (error) => {
            winston_1.default.error(error);
            res.send('error');
        });
    }
    sendBookingEmailToAll(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToAll(bookingId).subscribe((data) => {
            res.send(data);
        }, (error) => {
            winston_1.default.error(error);
            res.send('error');
        });
    }
    sendBookingEmailToCustomerAndCustomerCare(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToCustomerAndCustomerCare(bookingId).subscribe((data) => {
            res.send(data);
        }, (error) => {
            winston_1.default.error(error);
            res.send('error');
        });
    }
};
EmailController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.EmailService)),
    __metadata("design:paramtypes", [Object])
], EmailController);
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map