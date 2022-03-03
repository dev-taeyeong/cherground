import { inject, injectable } from 'inversify';
import { BannerController } from '..';
import { BannerService } from '../../../domain/service';
import { TYPES } from '../../../TYPES';

@injectable()
export class BannerControllerImpl implements BannerController {
  bannerService: BannerService;
  constructor(@inject(TYPES.BannerService) bannerService: BannerService) {
    this.bannerService = bannerService;
  }

  makeBanner(bannerData: any) {
    const { title, productType, mediaLocation, startTime, endTime } =
      bannerData;
    return this.bannerService.getOverlapBannerSchedules(
      title,
      productType,
      mediaLocation,
      startTime,
      endTime
    );
  }

  readBannerDetail(id: number) {
    return this.bannerService.getBannerDetail(id);
  }
}
