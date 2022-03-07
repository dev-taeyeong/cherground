import { Announce } from '../../entities/Announce';
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
    startTime: string,
    endTime: string
  ): Promise<DuplicateSchedule[]>;

  createDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[]
  ): Promise<void>;
}

export interface BannerRepository {
  createBanner(banner: Banner): Promise<string>;
  getWeeklyBannersByWeekStart(weekStart: string): Promise<Banner[]>;
}

export interface AnnounceRepository {
  createAnnounce(announce: Announce): Promise<void>;
  getWeeklyAnnouncesByWeekStart(weekStart: string): Promise<Announce[]>;
}
