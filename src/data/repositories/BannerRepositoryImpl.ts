import { BannerRepository } from '../../domain/interactor/repositories';
import { BannerDao } from '../dao';

export class BannerRepoitoryImpl implements BannerRepository {
  bannerDao: BannerDao;

  constructor(bannerDao: BannerDao) {
    this.bannerDao = BannerDao;
  }

  createBanner(bannerData) {
    this.bannerDao.createBanner(bannerData);
  }

  readAllBanners() {}

  readBannerById(id) {}

  updateBannerById(id, bannerData) {}

  deleteBannerByid(id) {}
}
