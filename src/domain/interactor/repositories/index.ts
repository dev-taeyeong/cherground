import { Announce } from '../../entities/Announce';
import { Banner } from '../../entities/Banner';
import { BannerExposePlace } from '../../entities/BannerExposePlace';
import { DuplicateSchedule } from '../../entities/DuplicateSchedule';

export interface DuplicateScheduleRepository {
  getDuplicateSchedule(
    bannerExposePlace: BannerExposePlace,
    startTime: string,
    endTime: string
  ): Promise<DuplicateSchedule[]>;

  createDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[]
  ): Promise<void>;

  createBannerAndDuplicateSchedule(
    ordinal: string,
    bannerId: string,
    duplicateScheduleId: string
  ): any;

  updateDuplicateSchedule(duplicateSchedule: DuplicateSchedule): any;
}

export interface BannerRepository {
  createBanner(banner: Banner): Promise<string>;
  getWeeklyBannersByWeekStart(weekStart: string): Promise<Banner[]>;
}

export interface AnnounceRepository {
  createAnnounce(announce: Announce): Promise<void>;
  getWeeklyAnnouncesByWeekStart(weekStart: string): Promise<Announce[]>;
}
