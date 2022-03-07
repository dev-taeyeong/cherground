import { Banner, BannerExposePlace } from '../entities/Banner';
import { Announce } from '../entities/Announce';
import { DuplicateSchedule } from '../entities/DuplicateSchedule';
import { ContentType, Service } from '../entities/Content';

export interface DuplicateScheduleService {
  adjustDuplicateSchedules(
    contentType: ContentType,
    title: string,
    service: Service,
    bannerExposePlace: BannerExposePlace,
    isLink: boolean,
    connectionLink: string,
    imageUrl: string,
    startTime: Date,
    endTime: Date
  ): Promise<DuplicateSchedule[] | void>;

  makeDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[],
    createdBannerId: string
  ): Promise<void>;
}

export interface BannerService {
  makeBanner(banner: Banner): Promise<string>; // 배너 생성
  readWeekBanners(weekStart: Date, currentTime: Date): Promise<Banner[]>;
}
