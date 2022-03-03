"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRepoitoryImpl = void 0;
class BannerRepoitoryImpl {
    constructor(bannerDao) {
        this.bannerDao = BannerDao;
    }
    createBanner(bannerData) {
        this.bannerDao.createBanner(bannerData);
    }
    readAllBanners() { }
    readBannerById(id) { }
    updateBannerById(id, bannerData) { }
    deleteBannerByid(id) { }
}
exports.BannerRepoitoryImpl = BannerRepoitoryImpl;
