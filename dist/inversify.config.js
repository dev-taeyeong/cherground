"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const BannerControllerImpl_1 = require("./api/controller/implements/BannerControllerImpl");
const DuplicateScheduleController_1 = require("./api/controller/implements/DuplicateScheduleController");
const routes_1 = require("./api/routes");
const BannerRouter_1 = require("./api/routes/BannerRouter");
const DuplicateScheduleRouter_1 = require("./api/routes/DuplicateScheduleRouter");
const BannerRepositoryImpl_1 = require("./data/mock-data/BannerRepositoryImpl");
const DuplicateScheduleRepositoryImpl_1 = require("./data/mock-data/DuplicateScheduleRepositoryImpl");
const BannerServiceImpl_1 = require("./domain/service/implements/BannerServiceImpl");
const DuplicateScheduleServiceImpl_1 = require("./domain/service/implements/DuplicateScheduleServiceImpl");
const TYPES_1 = require("./TYPES");
exports.container = new inversify_1.Container();
// Routes
exports.container.bind(TYPES_1.TYPES.Routes).to(routes_1.RoutesImpl);
// Banner
exports.container
    .bind(TYPES_1.TYPES.BannerRepository)
    .to(BannerRepositoryImpl_1.BannerRepositoryImpl);
exports.container.bind(TYPES_1.TYPES.BannerService).to(BannerServiceImpl_1.BannerServiceImpl);
exports.container
    .bind(TYPES_1.TYPES.BannerController)
    .to(BannerControllerImpl_1.BannerControllerImpl);
exports.container.bind(TYPES_1.TYPES.BannerRouter).to(BannerRouter_1.BannerRouterImpl);
// DuplicateSchedule
exports.container
    .bind(TYPES_1.TYPES.DuplicateScheduleRepository)
    .to(DuplicateScheduleRepositoryImpl_1.DuplicateScheduleRepositoryImpl);
exports.container
    .bind(TYPES_1.TYPES.DuplicateScheduleService)
    .to(DuplicateScheduleServiceImpl_1.DuplicateScheduleServiceImpl);
exports.container
    .bind(TYPES_1.TYPES.DuplicateScheduleController)
    .to(DuplicateScheduleController_1.DuplicateScheduleControllerImpl);
exports.container
    .bind(TYPES_1.TYPES.DuplicateScheduleRouter)
    .to(DuplicateScheduleRouter_1.DuplicateScheduleRouterImpl);
