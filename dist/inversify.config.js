"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const BannerControllerImpl_1 = require("./api/controller/implements/BannerControllerImpl");
const routes_1 = require("./api/routes");
const BannerRouter_1 = require("./api/routes/BannerRouter");
const BannerRepositoryImpl_1 = require("./data/mock-data/BannerRepositoryImpl");
const BannerServiceImpl_1 = require("./domain/service/implements/BannerServiceImpl");
const TYPES_1 = require("./TYPES");
exports.container = new inversify_1.Container();
exports.container
    .bind(TYPES_1.TYPES.BannerRepository)
    .to(BannerRepositoryImpl_1.BannerRepositoryImpl);
exports.container.bind(TYPES_1.TYPES.BannerService).to(BannerServiceImpl_1.BannerServiceImpl);
exports.container
    .bind(TYPES_1.TYPES.BannerController)
    .to(BannerControllerImpl_1.BannerControllerImpl);
exports.container.bind(TYPES_1.TYPES.BannerRouter).to(BannerRouter_1.BannerRouterImpl);
exports.container.bind(TYPES_1.TYPES.Routes).to(routes_1.RoutesImpl);
