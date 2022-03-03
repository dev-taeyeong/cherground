import { inject, injectable } from 'inversify';
import lodash from 'lodash';
import { BannerService } from '..';
import { TYPES } from '../../../TYPES';
import { Banner } from '../../entities/Banner';
import { MediaLocation } from '../../entities/MediaLocation';
import { OverlapBannerSchedule } from '../../entities/OverlapBannerSchedule';
import { ProductType } from '../../entities/ProductType';
import { BannerRepository } from '../../interactor/repositories';

class Copy {
  constructor() {}
  deepCopy(obj: { [key: string]: any }) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    let copy: { [key: string]: any } = {};
    for (let key in obj) {
      if (Array.isArray(obj[key])) {
        copy[key] = [];

        for (let index in this.deepCopy(obj[key])) {
          copy[key].push(this.deepCopy(obj[key])[index]);
        }
      } else copy[key] = this.deepCopy(obj[key]);
    }

    return copy;
  }
}

@injectable()
export class BannerServiceImpl implements BannerService {
  bannerRepository: BannerRepository;
  constructor(
    @inject(TYPES.BannerRepository) bannerRepository: BannerRepository
  ) {
    this.bannerRepository = bannerRepository;
  }

  getOverlapBannerSchedules(
    title: string,
    productType: ProductType,
    mediaLocation: MediaLocation,
    startTime: Date,
    endTime: Date
  ): Promise<void | OverlapBannerSchedule[]> {
    const overlapBannerSchedules =
      this.bannerRepository.getOverlapBannerSchedules(
        productType,
        mediaLocation,
        startTime,
        endTime
      );

    let cutPointStart: null | number = null;
    let cutPointEnd: null | number = null;
    let createCount = 0;

    // 배너 중복 스케줄에서 잘라야 하는 스케줄 찾기
    overlapBannerSchedules.forEach(
      (overlapBannerSchedule: OverlapBannerSchedule, index: number) => {
        if (
          overlapBannerSchedule.scheduleStartTime < new Date(startTime) &&
          overlapBannerSchedule.scheduleEndTime > new Date(startTime)
        ) {
          cutPointStart = index;
        }

        if (
          overlapBannerSchedule.scheduleStartTime < new Date(endTime) &&
          overlapBannerSchedule.scheduleEndTime > new Date(endTime)
        ) {
          cutPointEnd = index;
        }
      }
    );

    // 잘라야할 부분이 있다면 자르기(시작 시간)
    if (cutPointStart !== null) {
      overlapBannerSchedules[cutPointStart].scheduleStartTime = new Date(
        startTime
      );
    }

    // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
    else if (
      overlapBannerSchedules[0].scheduleStartTime.getTime() !==
      new Date(startTime).getTime()
    ) {
      overlapBannerSchedules.push(lodash.cloneDeep(overlapBannerSchedules[0]));

      overlapBannerSchedules[
        overlapBannerSchedules.length - 1
      ].overlapBanners.pop();

      overlapBannerSchedules[
        overlapBannerSchedules.length - 1
      ].scheduleEndTime =
        overlapBannerSchedules[
          overlapBannerSchedules.length - 1
        ].scheduleStartTime;

      overlapBannerSchedules[
        overlapBannerSchedules.length - 1
      ].scheduleStartTime = new Date(startTime);

      createCount++;
    }

    // 잘라야할 부분이 있다면 자르기(종료 시간)
    if (cutPointEnd !== null) {
      overlapBannerSchedules[cutPointEnd].scheduleEndTime = new Date(endTime);
    }

    // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
    else if (
      overlapBannerSchedules[
        overlapBannerSchedules.length - 1 - createCount
      ].scheduleEndTime.getTime() !== new Date(endTime).getTime()
    ) {
      overlapBannerSchedules.push(
        lodash.cloneDeep(
          overlapBannerSchedules[
            overlapBannerSchedules.length - 1 - createCount
          ]
        )
      );

      overlapBannerSchedules[
        overlapBannerSchedules.length - 1
      ].overlapBanners.pop();

      overlapBannerSchedules[
        overlapBannerSchedules.length - 1
      ].scheduleStartTime =
        overlapBannerSchedules[
          overlapBannerSchedules.length - 1
        ].scheduleEndTime;

      overlapBannerSchedules[
        overlapBannerSchedules.length - 1
      ].scheduleEndTime = new Date(endTime);
    }

    // scheduleStartTime 오름차순으로 정렬
    overlapBannerSchedules.sort(
      (a: OverlapBannerSchedule, b: OverlapBannerSchedule) => {
        return a.scheduleStartTime.getTime() - b.scheduleStartTime.getTime();
      }
    );

    // 중복되는 스케줄에 새로 들어온 배너 추가해주기
    overlapBannerSchedules.forEach(
      (overlapBannerSchedule: OverlapBannerSchedule, index: number) => {
        overlapBannerSchedule.overlapBanners.push({
          banner: {
            id: null,
            title: title,
            startTime: startTime,
            endTime: endTime,
          },
          exposureOrdinal: overlapBannerSchedule.overlapBanners.length + 1,
        });
      }
    );

    return overlapBannerSchedules;
  }

  getBannerDetail(id: number): Promise<Banner> {
    return this.bannerRepository.getBannerById(id);
  }

  // // 배너 생성
  // makeBanner(bannerData: Banner) {
  //   const { location, startTime, endTime } = bannerData;

  //   // 1. 해당 위치에 있는 배너 목록 조회
  //   const banners: [] = this.bannerRepository.getBannersByLocation(location);

  //   // 2. 해당 위치에 있는 배너 목록 중 시간이 중복되는 배너 조회
  //   const overLapBanners: [] = banners.map((banner) => {
  //     if (
  //       bannerData.endTime.getTime() > banner.startTime.getTime() &&
  //       bannerData.startTime.getTime() < banner.endTime.getTime()
  //     ) {
  //       return banner;
  //     }
  //   });
  //   // [겹치는 배너가 있을 경우]
  //   // - 1 겹치는 배너들끼리 자르기 (잘라야 하는 시간 조회)
  //   const cutPoints: [] = [];
  //   overLapBanners.forEach((overLapBanner) => {
  //     if (
  //       bannerData.startTime.getTime() < overLapBanner.startTime.getTime() &&
  //       bannerData.endTime.getTime() > overLapBanner.startTime.getTime()
  //     ) {
  //       cutPoints.push(overLapBanner.startTime);
  //     }

  //     if (
  //       bannerData.startTime.getTime() < overLapBanner.endTime.getTime() &&
  //       bannerData.endTime.getTime() > overLapBanner.endTime.getTime()
  //     ) {
  //       cutPoints.push(overLapBanner.endTime);
  //     }
  //   });
  //   // - 2 시간별 겹치는 배너들끼리 묶어서 보내주기
  //   // - 3 프론트에서 노출 순서, 노출 시간 데이터 받아오기
  //   // 2. 배너 생성
  // }

  // readAllBanners() {
  //   this.bannerRepository.readAllBanners();
  // }

  // readBannerDetail(id: number) {
  //   this.bannerRepository.readBannerById();
  // }

  // updateBanner(id: number, bannerData) {
  //   this.bannerRepository.updateBannerById();
  // }

  // deleteBanner(id: number) {
  //   this.bannerRepository.deleteBannerById();
  // }
}
