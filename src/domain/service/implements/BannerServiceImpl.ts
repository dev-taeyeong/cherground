import { inject, injectable } from 'inversify';
import { BannerService } from '..';
import { TYPES } from '../../../TYPES';
import { Banner } from '../../entities/Banner';
import {
  BannerRepository,
  DuplicateScheduleRepository,
} from '../../interactor/repositories';

@injectable()
export class BannerServiceImpl implements BannerService {
  private bannerRepository: BannerRepository;
  private duplicateScheduleRepository: DuplicateScheduleRepository;

  constructor(
    @inject(TYPES.BannerRepository) bannerRepository: BannerRepository,
    @inject(TYPES.DuplicateScheduleRepository)
    duplicateScheduleRepository: DuplicateScheduleRepository
  ) {
    this.bannerRepository = bannerRepository;
    this.duplicateScheduleRepository = duplicateScheduleRepository;
  }

  makeBanner(data): any {
    return this.bannerRepository
      .createBanner(data.banner) //
      .then((createdBannerId: string) => {
        data.duplicateSchedules.forEach((duplicateSchedule) => {
          duplicateSchedule.overlapBanners.forEach((overlapBanner) => {
            if (overlapBanner.id === null) overlapBanner.id = createdBannerId;
          });
        });

        return data;
      })
      .then((data) => {
        data.duplicateSchedules.forEach(async (duplicateSchedule) => {
          if (duplicateSchedule.id === null) {
            const createdDuplicateScheduleId =
              await this.duplicateScheduleRepository.createDuplicateSchedule(
                duplicateSchedule
              );

            duplicateSchedule.overlapBanners.forEach((overlapBanner) => {
              this.duplicateScheduleRepository.createBannerAndDuplicateSchedule(
                overlapBanner.ordinal,
                overlapBanner.id,
                createdDuplicateScheduleId
              );
            });
          } else {
            this.duplicateScheduleRepository.updateDuplicateSchedule(
              duplicateSchedule
            );

            // bannerAndDuplicateSchedule 조회 (bannerId, duplicateScheduleId)
            // 있으면 ordianl 변경
            // 없으면 bannerId, duplicateScheduleId, ordinal로 데이터 생성
          }
        });
      });
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
