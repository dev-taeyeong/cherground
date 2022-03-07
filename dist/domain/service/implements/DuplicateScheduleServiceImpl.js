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
exports.DuplicateScheduleServiceImpl = void 0;
const inversify_1 = require("inversify");
const lodash_1 = __importDefault(require("lodash"));
const TYPES_1 = require("../../../TYPES");
let DuplicateScheduleServiceImpl = class DuplicateScheduleServiceImpl {
    constructor(duplicateScheduleRepository) {
        this.duplicateScheduleRepository = duplicateScheduleRepository;
    }
    adjustDuplicateSchedules(contentType, title, service, bannerExposePlace, isLink, connectionLink, imageUrl, startTime, endTime) {
        return this.duplicateScheduleRepository
            .getDuplicateSchedule(contentType, title, service, bannerExposePlace, isLink, connectionLink, imageUrl, startTime, endTime)
            .then((duplicateSchedules) => {
            let cutPointStart = null;
            let cutPointEnd = null;
            let createCount = 0;
            // 배너 중복 스케줄에서 잘라야 하는 스케줄 찾기
            duplicateSchedules.forEach((duplicateSchedule, index) => {
                if (new Date(duplicateSchedule.scheduleStartTime).getTime() <
                    new Date(startTime).getTime() &&
                    new Date(duplicateSchedule.scheduleEndTime).getTime() >
                        new Date(startTime).getTime()) {
                    cutPointStart = index;
                }
                if (new Date(duplicateSchedule.scheduleStartTime).getTime() <
                    new Date(endTime).getTime() &&
                    new Date(duplicateSchedule.scheduleEndTime).getTime() >
                        new Date(endTime).getTime()) {
                    cutPointEnd = index;
                }
            });
            // 잘라야할 부분이 있다면 자르기(시작 시간)
            if (cutPointStart !== null) {
                duplicateSchedules.push(lodash_1.default.cloneDeep(duplicateSchedules[cutPointStart]));
                duplicateSchedules[duplicateSchedules.length - 1].id = null;
                duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime =
                    new Date(startTime);
                duplicateSchedules[cutPointStart].scheduleEndTime = new Date(startTime);
                createCount++;
            }
            // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
            else if (new Date(duplicateSchedules[0].scheduleStartTime).getTime() !==
                new Date(startTime).getTime()) {
                duplicateSchedules.push(lodash_1.default.cloneDeep(duplicateSchedules[0]));
                duplicateSchedules[duplicateSchedules.length - 1].id = null;
                duplicateSchedules[duplicateSchedules.length - 1].overlapBanners.pop();
                duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime =
                    duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime;
                duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime =
                    new Date(startTime);
                createCount++;
            }
            // 잘라야할 부분이 있다면 자르기(종료 시간)
            if (cutPointEnd !== null) {
                duplicateSchedules.push(lodash_1.default.cloneDeep(duplicateSchedules[cutPointEnd]));
                duplicateSchedules[duplicateSchedules.length - 1].id = null;
                duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime =
                    new Date(endTime);
                duplicateSchedules[cutPointEnd].scheduleStartTime = new Date(endTime);
                createCount++;
            }
            // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
            else if (new Date(duplicateSchedules[duplicateSchedules.length - 1 - createCount].scheduleEndTime).getTime() !== new Date(endTime).getTime()) {
                duplicateSchedules.push(lodash_1.default.cloneDeep(duplicateSchedules[duplicateSchedules.length - 1 - createCount]));
                duplicateSchedules[duplicateSchedules.length - 1].id = null;
                duplicateSchedules[duplicateSchedules.length - 1].overlapBanners.pop();
                duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime =
                    duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime;
                duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime =
                    new Date(endTime);
            }
            // 중복되는 배너 스케줄에 새로 들어온 배너 추가해주기
            duplicateSchedules.forEach((overlapBannerSchedule, index) => {
                overlapBannerSchedule.overlapBanners.forEach((overlapBanner) => {
                    switch (overlapBanner.ordinal) {
                        case 'first':
                            overlapBanner.ordinal = 'second';
                            break;
                        case 'second':
                            overlapBanner.ordinal = 'third';
                            break;
                        case 'third':
                            overlapBanner.ordinal = 'fourth';
                            break;
                        case 'fourth':
                            overlapBanner.ordinal = 'fifth';
                        default:
                            throw new Error('There are already 5 banners');
                    }
                });
                if (index !== cutPointStart && index !== cutPointEnd) {
                    overlapBannerSchedule.overlapBanners.push({
                        banner: {
                            id: null,
                            contentType,
                            title,
                            service,
                            bannerExposePlace,
                            isLink,
                            connectionLink,
                            imageUrl,
                            startTime,
                            endTime,
                        },
                        ordinal: 'first',
                    });
                }
            });
            // scheduleStartTime 오름차순으로 정렬
            duplicateSchedules.sort((a, b) => {
                return (new Date(a.scheduleStartTime).getTime() -
                    new Date(b.scheduleStartTime).getTime());
            });
            return duplicateSchedules;
        });
    }
    makeDuplicateSchedule(duplicateSchedules, createdBannerId) {
        duplicateSchedules.forEach((duplicateSchedule) => {
            duplicateSchedule.overlapBanners.forEach((overlapBanner) => {
                if (!overlapBanner.banner.id)
                    overlapBanner.banner.id = createdBannerId;
            });
        });
        return this.duplicateScheduleRepository.createDuplicateSchedule(duplicateSchedules);
    }
};
DuplicateScheduleServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES_1.TYPES.DuplicateScheduleRepository)),
    __metadata("design:paramtypes", [Object])
], DuplicateScheduleServiceImpl);
exports.DuplicateScheduleServiceImpl = DuplicateScheduleServiceImpl;
