import { inject, injectable } from 'inversify';
import { BannerService } from '..';
import { TYPES } from '../../../TYPES';
import { Banner } from '../../entities/Banner';
import { DuplicateSchedule } from '../../entities/DuplicateSchedule';
import { BannerRepository } from '../../interactor/repositories';

@injectable()
export class BannerServiceImpl implements BannerService {
  bannerRepository: BannerRepository;
  constructor(
    @inject(TYPES.BannerRepository) bannerRepository: BannerRepository
  ) {
    this.bannerRepository = bannerRepository;
  }

  makeBanner(banner: Banner): Promise<string> {
    return this.bannerRepository
      .createBanner(banner) //
      .then((createdBannerId: string) => createdBannerId);
  }

  readWeekBanners(weekStart: Date, currentTime: Date): Promise<Banner[]> {
    return this.bannerRepository
      .getWeekBannersByWeekStart(weekStart)
      .then((weekBanners) => {
        weekBanners.forEach((weekBanner) => {
          if (
            new Date(weekBanner.startTime).getTime() <=
              new Date(currentTime).getTime() &&
            new Date(weekBanner.endTime).getTime() >
              new Date(currentTime).getTime()
          ) {
            weekBanner.state = 'live';
          } else if (
            new Date(weekBanner.startTime).getTime() <=
              new Date(currentTime).getTime() &&
            new Date(weekBanner.endTime).getTime() <=
              new Date(currentTime).getTime()
          ) {
            weekBanner.state = 'end';
          } else {
            weekBanner.state = 'reservation';
          }
        });

        return weekBanners;
      });
  }
}
