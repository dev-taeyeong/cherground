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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerServiceImpl = void 0;
const inversify_1 = require("inversify");
const lodash_1 = __importDefault(require("lodash"));
const TYPES_1 = require("../../../TYPES");
class Copy {
    constructor() { }
    deepCopy(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        let copy = {};
        for (let key in obj) {
            if (Array.isArray(obj[key])) {
                copy[key] = [];
                for (let index in this.deepCopy(obj[key])) {
                    copy[key].push(this.deepCopy(obj[key])[index]);
                }
            }
            else
                copy[key] = this.deepCopy(obj[key]);
        }
        return copy;
    }
}
let BannerServiceImpl = class BannerServiceImpl {
    constructor(bannerRepository) {
        this.bannerRepository = bannerRepository;
    }
    getOverlapBannerSchedules(title, productType, mediaLocation, startTime, endTime) {
        const overlapBannerSchedules = this.bannerRepository.getOverlapBannerSchedules(productType, mediaLocation, startTime, endTime);
        let cutPointStart = null;
        let cutPointEnd = null;
        let createCount = 0;
        // 배너 중복 스케줄에서 잘라야 하는 스케줄 찾기
        overlapBannerSchedules.forEach((overlapBannerSchedule, index) => {
            if (overlapBannerSchedule.scheduleStartTime < new Date(startTime) &&
                overlapBannerSchedule.scheduleEndTime > new Date(startTime)) {
                cutPointStart = index;
            }
            if (overlapBannerSchedule.scheduleStartTime < new Date(endTime) &&
                overlapBannerSchedule.scheduleEndTime > new Date(endTime)) {
                cutPointEnd = index;
            }
        });
        // 잘라야할 부분이 있다면 자르기(시작 시간)
        if (cutPointStart !== null) {
            overlapBannerSchedules[cutPointStart].scheduleStartTime = new Date(startTime);
        }
        // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
        else if (overlapBannerSchedules[0].scheduleStartTime.getTime() !==
            new Date(startTime).getTime()) {
            overlapBannerSchedules.push(lodash_1.default.cloneDeep(overlapBannerSchedules[0]));
            overlapBannerSchedules[overlapBannerSchedules.length - 1].overlapBanners.pop();
            overlapBannerSchedules[overlapBannerSchedules.length - 1].scheduleEndTime =
                overlapBannerSchedules[overlapBannerSchedules.length - 1].scheduleStartTime;
            overlapBannerSchedules[overlapBannerSchedules.length - 1].scheduleStartTime = new Date(startTime);
            createCount++;
        }
        // 잘라야할 부분이 있다면 자르기(종료 시간)
        if (cutPointEnd !== null) {
            overlapBannerSchedules[cutPointEnd].scheduleEndTime = new Date(endTime);
        }
        // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
        else if (overlapBannerSchedules[overlapBannerSchedules.length - 1 - createCount].scheduleEndTime.getTime() !== new Date(endTime).getTime()) {
            overlapBannerSchedules.push(lodash_1.default.cloneDeep(overlapBannerSchedules[overlapBannerSchedules.length - 1 - createCount]));
            overlapBannerSchedules[overlapBannerSchedules.length - 1].overlapBanners.pop();
            overlapBannerSchedules[overlapBannerSchedules.length - 1].scheduleStartTime =
                overlapBannerSchedules[overlapBannerSchedules.length - 1].scheduleEndTime;
            overlapBannerSchedules[overlapBannerSchedules.length - 1].scheduleEndTime = new Date(endTime);
        }
        // scheduleStartTime 오름차순으로 정렬
        overlapBannerSchedules.sort((a, b) => {
            return a.scheduleStartTime.getTime() - b.scheduleStartTime.getTime();
        });
        // 중복되는 스케줄에 새로 들어온 배너 추가해주기
        overlapBannerSchedules.forEach((overlapBannerSchedule, index) => {
            overlapBannerSchedule.overlapBanners.push({
                banner: {
                    id: null,
                    title: title,
                    startTime: startTime,
                    endTime: endTime,
                },
                exposureOrdinal: overlapBannerSchedule.overlapBanners.length + 1,
            });
        });
        return overlapBannerSchedules;
    }
    getBannerDetail(id) {
        return this.bannerRepository.getBannerById(id);
    }
};
BannerServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES_1.TYPES.BannerRepository)),
    __metadata("design:paramtypes", [Object])
], BannerServiceImpl);
exports.BannerServiceImpl = BannerServiceImpl;
