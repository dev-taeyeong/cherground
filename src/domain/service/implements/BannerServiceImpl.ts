import { BannerService } from '..';
import { BannerRepository } from '../../interactor/repositories';

export class BannerServiceImpl implements BannerService {
  bannerRepository: BannerRepository;
  constructor(bannerRepository: BannerRepository) {
    this.bannerRepository = bannerRepository;
  }

  makeBanner(bannerData) {
    // 1. 해당 위치에 있는 배너 전체 조회
    this.bannerRepository.readAllBannerByLocation();
    // [겹치는 일정이 있다면]
    // - 1 조회된 배너 중 현재 등록하는 배너와 시간이 겹치는 배너 목록 조회
    // - 2 겹치는 배너들끼리 자르기 (다른 배너가 시작되거나 끝날때마다 자른다.)
    // - 3 시간별 겹치는 배너들끼리 묶어서 보내주기
    // - 4 프론트에서 노출 순서, 노출 시간 데이터 받아오기
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
