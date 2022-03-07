import { inject, injectable } from 'inversify';
import { BannerService } from '..';
import { TYPES } from '../../../TYPES';
import { Banner } from '../../entities/Banner';
import { BannerRepository } from '../../interactor/repositories';

@injectable()
export class BannerServiceImpl implements BannerService {
  private bannerRepository: BannerRepository;

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

  readWeeklyBanners(weekStart: string, currentTime: string): Promise<Banner[]> {
    return this.bannerRepository
      .getWeeklyBannersByWeekStart(weekStart)
      .then((weeklyBanners) => {
        weeklyBanners.forEach((weeklyBanner) => {
          if (
            new Date(weeklyBanner.startTime).getTime() <=
              new Date(currentTime).getTime() &&
            new Date(weeklyBanner.endTime).getTime() >
              new Date(currentTime).getTime()
          ) {
            weeklyBanner.state = 'live';
          } else if (
            new Date(weeklyBanner.startTime).getTime() <=
              new Date(currentTime).getTime() &&
            new Date(weeklyBanner.endTime).getTime() <=
              new Date(currentTime).getTime()
          ) {
            weeklyBanner.state = 'end';
          } else {
            weeklyBanner.state = 'reservation';
          }
        });

        return weeklyBanners;
      });
  }
}
