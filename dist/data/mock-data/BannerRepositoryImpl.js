"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRepositoryImpl = void 0;
const inversify_1 = require("inversify");
const lodash_1 = __importDefault(require("lodash"));
const Data_1 = __importDefault(require("./Data"));
let BannerRepositoryImpl = class BannerRepositoryImpl {
    getOverlapBannerSchedules(productType, mediaLocation, startTime, endTime) {
        const overlapBannerSchedules = [];
        Data_1.default.overlapBannerSchedule.forEach((data) => {
            if (data.scheduleStartTime.getTime() < new Date(endTime).getTime() &&
                data.scheduleEndTime.getTime() > new Date(startTime).getTime()) {
                overlapBannerSchedules.push(lodash_1.default.cloneDeep(data));
            }
        });
        return overlapBannerSchedules;
    }
    getBannerById(id) {
        let bannerData;
        Data_1.default.banner.forEach((data) => {
            if (data.id === id) {
                bannerData = lodash_1.default.cloneDeep(data);
            }
        });
        return bannerData;
    }
};
BannerRepositoryImpl = __decorate([
    (0, inversify_1.injectable)()
], BannerRepositoryImpl);
exports.BannerRepositoryImpl = BannerRepositoryImpl;
