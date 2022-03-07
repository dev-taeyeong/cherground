import { Banner, BannerExposePlace } from '../../entities/Banner';
import { ContentType, Service } from '../../entities/Content';
import { DuplicateSchedule } from '../../entities/DuplicateSchedule';

export interface DuplicateScheduleRepository {
  getDuplicateSchedule(
    contentType: ContentType,
    title: string,
    service: Service,
    bannerExposePlace: BannerExposePlace,
    isLink: boolean,
    connectionLink: string,
    imageUrl: string,
    startTime: Date,
    endTime: Date
  ): Promise<DuplicateSchedule[]>;

  createDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[]
  ): Promise<void>;
}

export interface BannerRepository {
  createBanner(banner: Banner): Promise<string>;
  getWeekBannersByWeekStart(weekStart: Date): Promise<Banner[]>;
}
