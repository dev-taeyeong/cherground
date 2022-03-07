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
    startTime: string,
    endTime: string
  ): Promise<DuplicateSchedule[] | void>;

  makeDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[],
    createdBannerId: string
  ): Promise<void>;
}

export interface BannerService {
  makeBanner(banner: Banner): Promise<string>; // 배너 생성
  readWeeklyBanners(weekStart: string, currentTime: string): Promise<Banner[]>;
}

export interface AnnounceService {
  makeAnnounce(announce: Announce): Promise<void>;
  readWeeklyAnnounce(
    weekStart: string,
    currentTime: string
  ): Promise<Announce[]>;
}
