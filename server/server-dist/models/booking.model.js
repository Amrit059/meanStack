"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PaymentSchema = new mongoose.Schema({
    paymentMode: { type: String },
    payStatus: { type: String },
    payAmount: { type: Number },
    displayRate: { type: Number },
    actualRate: { type: Number },
    discount: { type: Number },
    couponName: { type: String },
    couponDiscount: { type: Number },
    razorpayPaymentId: { type: String }
});
exports.RoomToGuestMappingSchema = new mongoose.Schema({
    roomNo: { type: String },
    guestType: { type: String },
    hourType: { type: String },
    roomType: { type: String }
});
exports.BookingSchema = new mongoose.Schema({
    userId: { type: String },
    bookingDate: { type: Date },
    checkinDate: { type: String },
    checkinTime: { type: String },
    checkoutDate: { type: String },
    checkoutTime: { type: String },
    paymentDoneTimestamp: { type: String },
    bookingCancelledTimestamp: { type: String },
    guestName: { type: String },
    mobileNumber: { type: Number },
    guestEmail: { type: String },
    roomToGuestMapping: [exports.RoomToGuestMappingSchema],
    status: { type: String },
    stayType: { type: String },
    roomId: { type: String },
    hotelId: { type: String },
    payment: exports.PaymentSchema,
    hotelFrontImage: { type: String },
    hotelOwnerEmail: { type: String },
    hotelName: { type: String },
    hotelAddress: { type: String },
    briefDescription: { type: String }
});
const Booking = mongoose.model('Booking', exports.BookingSchema, 'Booking');
exports.default = Booking;
//# sourceMappingURL=booking.model.js.map