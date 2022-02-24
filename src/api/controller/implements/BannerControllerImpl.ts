import { BannerController } from '..';
import { BannerService } from '../../../domain/service';

export class BannerControllerImpl implements BannerController {
  bannerService: BannerService;
  constructor(bannerService: BannerService) {
    this.bannerService = bannerService;
  }

  makeBanner(bannerData: any) {
    this.bannerService.makeBanner(bannerData);
  }

  readAllBanners() {
    this.bannerService.readAllBanners();
  }

  readBannerDetail(id: number) {
    this.bannerService.readBannerDetail(id);
  }

  updateBanner(id: number, bannerData) {
    this.bannerService.updateBanner(id, bannerData);
  }

  deleteBanner(id: number) {
    this.bannerService.deleteBanner(id);
  }
}
