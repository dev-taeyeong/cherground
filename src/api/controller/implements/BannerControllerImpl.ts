import { inject, injectable } from 'inversify';
import { BannerController } from '..';
import { Banner } from '../../../domain/entities/Banner';
import { BannerService } from '../../../domain/service';
import { TYPES } from '../../../TYPES';

@injectable()
export class BannerControllerImpl implements BannerController {
  private bannerService: BannerService;

  constructor(@inject(TYPES.BannerService) bannerService: BannerService) {
    this.bannerService = bannerService;
  }

  makeBanner(data) {
    return this.bannerService.makeBanner(data);
  }

  readWeeklyBanners(weekStart: string, currentTime: string): Promise<Banner[]> {
    return this.bannerService.readWeeklyBanners(weekStart, currentTime);
  }
}
