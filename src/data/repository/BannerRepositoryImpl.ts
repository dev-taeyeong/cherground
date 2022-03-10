import { inject, injectable } from 'inversify';
import { BannerDao } from '../dao';
import { Banner } from '../../domain/entities/Banner';
import { BannerRepository } from '../../domain/interactor/repositories';
import { TYPES } from '../../TYPES';

@injectable()
export class BannerRepositoryImpl implements BannerRepository {
  private bannerDao: BannerDao;

  constructor(@inject(TYPES.BannerDao) bannerDao: BannerDao) {
    this.bannerDao = bannerDao;
  }

  createBanner(banner: Banner): Promise<string> {
    return this.bannerDao
      .createBanner(banner)
      .then((createdBannerId) => createdBannerId);
  }
  getWeeklyBannersByWeekStart(weekStart: string): Promise<Banner[]> {}
}
