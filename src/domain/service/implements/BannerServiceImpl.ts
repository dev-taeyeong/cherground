import { BannerService } from '..';
import { BannerRepository } from '../../interactor/repositories';

export class BannerServiceImpl implements BannerService {
  bannerRepository: BannerRepository;
  constructor(bannerRepository: BannerRepository) {
    this.bannerRepository = bannerRepository;
  }

  makeBanner(bannerData) {
    const { location, startTime, endTime } = bannerData;

    // 1. 해당 위치에 있는 배너 목록 조회
    const banners: [] = this.bannerRepository.getBannersByLocation(location);

    // 2. 해당 위치에 있는 배너 목록 중 시간이 중복되는 배너 조회
    const overLapBanners: [] = banners.map((banner) => {
      if (
        bannerData.endTime.getTime() > banner.startTime.getTime() &&
        bannerData.startTime.getTime() < banner.endTime.getTime()
      ) {
        return banner;
      }
    });
    // [겹치는 배너가 있을 경우]
    // - 1 겹치는 배너들끼리 자르기 (잘라야 하는 시간 조회)
    const cutPoints: [] = [];
    overLapBanners.forEach((overLapBanner) => {
      if (
        bannerData.startTime.getTime() < overLapBanner.startTime.getTime() &&
        bannerData.endTime.getTime() > overLapBanner.startTime.getTime()
      ) {
        cutPoints.push(overLapBanner.startTime);
      }

      if (
        bannerData.startTime.getTime() < overLapBanner.endTime.getTime() &&
        bannerData.endTime.getTime() > overLapBanner.endTime.getTime()
      ) {
        cutPoints.push(overLapBanner.endTime);
      }
    });
    // - 2 시간별 겹치는 배너들끼리 묶어서 보내주기
    // - 3 프론트에서 노출 순서, 노출 시간 데이터 받아오기
    // 2. 배너 생성
  }

  readAllBanners() {
    this.bannerRepository.readAllBanners();
  }

  readBannerDetail(id: number) {
    this.bannerRepository.readBannerById();
  }

  updateBanner(id: number, bannerData) {
    this.bannerRepository.updateBannerById();
  }

  deleteBanner(id: number) {
    this.bannerRepository.deleteBannerById();
  }
}
