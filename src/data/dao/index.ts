import { Announce } from '../../domain/entities/Announce';
import { Banner } from '../../domain/entities/Banner';
import { BannerExposePlace } from '../../domain/entities/BannerExposePlace';
import { DuplicateSchedule } from '../../domain/entities/DuplicateSchedule';
import { ToBannerAndDuplicateScheduleVo } from '../vo/TypeORM/ToBannerAndDuplicateScheduleVo';
import { ToDuplicateScheduleVo } from '../vo/TypeORM/ToDuplicateScheduleVo';

export interface BannerDao {
  createBanner(banner: Banner): Promise<string>;
  getWeeklyBannersByWeekStart(weekStart: string): Promise<Banner[]>;
}

export interface DuplicateScheduleDao {
  getDuplicateSchedule(
    bannerExposePlace: BannerExposePlace,
    startTime: string,
    endTime: string
  ): Promise<ToDuplicateScheduleVo[]>;

  getBannerAndDuplicateSchedule(
    duplicateScheduleId: string
  ): Promise<ToBannerAndDuplicateScheduleVo>;

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

export interface AnnounceDao {
  createAnnounce(announce: Announce): Promise<void>;
  getWeeklyAnnouncesByWeekStart(weekStart: string): Promise<Announce[]>;
}
