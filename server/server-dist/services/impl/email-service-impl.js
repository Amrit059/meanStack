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
const types_1 = require("../../configuration/types");
const winston_1 = require("../../configuration/winston");
const constants_1 = require("../../constants/constants");
const querystring_1 = require("querystring");
const moment = require("moment");
const MAIL_CONFIG = config.get('appConfig.mailConfig');
let EmailServiceImpl = class EmailServiceImpl {
    constructor() {
        console.log('Email Services called');
    }
    sendBookingEmailToCustomerCare(bookingId) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare ');
        return rxjs_1.Observable.create((observer) => {
            this.bookingRepositoryDb.getBookingDataForEmail(bookingId).subscribe((data) => {
                winston_1.default.debug(JSON.stringify(data));
                let bookingModel = data[0];
                let postData = this.createBookingQueryStringDataForMail('ammysidhu059@gmail.com', null, null, bookingModel);
                this.emailUtil.sendBookingMail(postData).subscribe((result) => {
                    observer.next(result);
                }, (error) => {
                    observer.error(error);
                });
            }, (error) => {
                observer.error('error while calling');
            });
        });
    }
    sendBookingEmailToHotelVendor(bookingId) {
        throw new Error("Method not implemented.");
    }
    sendBookingEmailToAll(bookingId) {
        throw new Error("Method not implemented.");
    }
    sendBookingEmailToCustomerAndCustomerCare(bookingId) {
        throw new Error("Method not implemented.");
    }
    createBookingQueryStringDataForMail(to, cc, bcc, bookingModel) {
        winston_1.default.info('create booking query data for email');
        const postData = querystring_1.stringify({
            username: MAIL_CONFIG.username,
            api_key: MAIL_CONFIG.api_key,
            trackClicks: true,
            template: MAIL_CONFIG.template,
            isTransactional: true,
            from: constants_1.CONSTANTS.FROM,
            from_name: constants_1.CONSTANTS.FROMENAME,
            subject: constants_1.CONSTANTS.SUBJECT,
            to: 'ammysidhu059@gmail.com',
            cc: 'singh.amrit@bag2bag.in',
            merge_id: bookingModel._id,
            merge_checkindate: moment(bookingModel.checkinDate).utc().format("MMMM Do YYYY"),
            merge_checkintime: moment(bookingModel.checkinTime).utc().format('h:mm a'),
            merge_checkoutdate: moment(bookingModel.checkoutDate).utc().format("MMMM Do YYYY"),
            merge_checkouttime: moment(bookingModel.checkoutTime).utc().format('HH:mm'),
            merge_briefdescription: bookingModel.briefDescription,
            merge_bag2baglogo: constants_1.CONSTANTS.BAG_2_BAG_LOGO,
            merge_imagepath: constants_1.CONSTANTS.SERVER_PATH + bookingModel.hotelFrontImage,
            merge_guestname: bookingModel.guestName,
            merge_mobilenumber: bookingModel.mobileNumber,
            merge_status: bookingModel.status,
            merge_staytype: bookingModel.stayType,
            merge_hotelname: bookingModel.hotelName,
            merge_hoteladdress: bookingModel.hotelAddress,
            merge_hotelowneremail: bookingModel.hotelOwnerEmail,
            merge_guesttype: bookingModel.roomToGuestMapping[0].guestType,
            merge_hourtype: bookingModel.roomToGuestMapping[0].hourType,
            merge_roomtype: bookingModel.roomToGuestMapping[0].roomType,
            merge_paymentmode: bookingModel.payment.paymentMode,
            merge_paystatus: bookingModel.payment.payStatus,
            merge_payamount: bookingModel.payment.payAmount,
            merge_actualrate: bookingModel.payment.actualRate,
            merge_discount: bookingModel.payment.discount,
            merge_paidamount: bookingModel.payment.displayRate - bookingModel.payment.payAmount,
            merge_displayrate: bookingModel.payment.displayRate,
        });
        return postData;
    }
};
__decorate([
    inversify_1.inject(types_1.default.BookingRepository),
    __metadata("design:type", Object)
], EmailServiceImpl.prototype, "bookingRepositoryDb", void 0);
__decorate([
    inversify_1.inject(types_1.default.EmailUtil),
    __metadata("design:type", Object)
], EmailServiceImpl.prototype, "emailUtil", void 0);
EmailServiceImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EmailServiceImpl);
exports.EmailServiceImpl = EmailServiceImpl;
//# sourceMappingURL=email-service-impl.js.map