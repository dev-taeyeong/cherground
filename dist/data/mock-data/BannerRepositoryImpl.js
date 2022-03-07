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
const fs_1 = __importDefault(require("fs"));
const inversify_1 = require("inversify");
let BannerRepositoryImpl = class BannerRepositoryImpl {
    createBanner(banner) {
        const getBannerData = new Promise((resolve, reject) => {
            fs_1.default.readFile('./src/data/mock-data/data.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data).banner);
                }
            });
        });
        return getBannerData.then((bannerData) => {
            banner.id = (bannerData.length + 1).toString();
            bannerData.push(banner);
            fs_1.default.writeFile('./src/data/mock-data/test.json', JSON.stringify(bannerData), (err) => {
                if (err)
                    console.log(err);
            });
            return bannerData.length + '';
        });
    }
    getWeekBannersByWeekStart(weekStart) {
        const getBannerData = new Promise((resolve, reject) => {
            fs_1.default.readFile('./src/data/mock-data/data.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data).banner);
                }
            });
        });
        return getBannerData.then((banners) => {
            return banners.filter((banner) => {
                if (new Date(banner.startTime).getTime() <
                    new Date(weekStart).getTime() + 1000 * 60 * 60 * 24 * 7 &&
                    new Date(banner.endTime).getTime() > new Date(weekStart).getTime()) {
                    return banner;
                }
            });
        });
    }
};
BannerRepositoryImpl = __decorate([
    (0, inversify_1.injectable)()
], BannerRepositoryImpl);
exports.BannerRepositoryImpl = BannerRepositoryImpl;
