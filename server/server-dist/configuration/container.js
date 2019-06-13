"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("./types");
require("reflect-metadata");
const email_controller_1 = require("../controllers/email.controller");
const email_service_impl_1 = require("../services/impl/email-service-impl");
const booking_repository_1 = require("../repositories/booking.repository");
const email_util_impl_1 = require("../services/impl/email-util-impl");
const container = new inversify_1.Container();
container.bind(types_1.default.Controller).to(email_controller_1.EmailController);
container.bind(types_1.default.EmailService).to(email_service_impl_1.EmailServiceImpl);
container.bind(types_1.default.EmailUtil).to(email_util_impl_1.EmailUtilImpl);
container.bind(types_1.default.BookingRepository).to(booking_repository_1.BookingRepositoryImpl);
exports.default = container;
//# sourceMappingURL=container.js.map