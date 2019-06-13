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
const mongoose = require("mongoose");
const booking_model_1 = require("../models/booking.model");
const from_1 = require("rxjs/internal/observable/from");
const inversify_1 = require("inversify");
require("reflect-metadata");
let BookingRepositoryImpl = class BookingRepositoryImpl {
    constructor() {
        console.log('Email Repository');
    }
    getBookingDataForEmail(bookingId) {
        console.log('id is:', bookingId);
        return from_1.from(booking_model_1.default.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(bookingId) } },
            { $lookup: { from: 'Hotels', localField: 'hotelId', foreignField: '_id', as: 'hotelDocs' } },
            {
                $project: {
                    userId: '$userId',
                    bookingDate: '$bookingDate',
                    checkinDate: '$checkinDate',
                    checkinTime: '$checkinTime',
                    checkoutDate: '$checkoutDate',
                    checkoutTime: '$checkoutTime',
                    paymentDoneTimestamp: '$paymentDoneTimestamp',
                    bookingCancelledTimestamp: '$bookingCancelledTimestamp',
                    guestName: '$guestName',
                    mobileNumber: '$mobileNumber',
                    guestEmail: '$guestEmail',
                    status: '$status',
                    stayType: '$stayType',
                    roomId: '$roomId',
                    hotelId: '$hotelId',
                    roomToGuestMapping: '$roomToGuestMapping',
                    payment: '$payment',
                    hotelName: { '$arrayElemAt': ['$hotelDocs.name', 0] },
                    hotelAddress: { '$arrayElemAt': ['$hotelDocs.address', 0] },
                    isAllowingUnmarriedCouples: { '$arrayElemAt': ['$hotelDocs.isAllowingUnmarriedCouples', 0] },
                    briefDescription: { '$arrayElemAt': ['$hotelDocs.briefDescription', 0] },
                    hotelOwnerEmail: { '$arrayElemAt': ['$hotelDocs.hotelOwnerEmail', 0] },
                    hotelFrontImage: { '$arrayElemAt': ['$hotelDocs.hotelFrontImage', 0] }
                }
            }
        ]).exec());
    }
};
BookingRepositoryImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], BookingRepositoryImpl);
exports.BookingRepositoryImpl = BookingRepositoryImpl;
//# sourceMappingURL=booking.repository.js.map