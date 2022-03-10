import { Announce } from '../../domain/entities/Announce';
import { Banner } from '../../domain/entities/Banner';
import { DuplicateSchedule } from '../../domain/entities/DuplicateSchedule';

export interface DuplicateScheduleController {
  adjustDuplicateSchedule(
    bannerData: Banner
  ): Promise<DuplicateSchedule[] | void>;

  makeDuplicateSchedule(
    duplicateScedules: DuplicateSchedule[],
    createdBannerId: string
  ): Promise<void>;
}

export interface BannerController {
  makeBanner(banner: Banner): Promise<string>;
  readWeeklyBanners(weekStart: string, currentTime: string): Promise<Banner[]>;
}

export interface AnnounceController {
  makeAnnounce(announce: Announce): Promise<void>;
  readWeeklyAnnounce(
    weekStart: string,
    currentTime: string
  ): Promise<Announce[]>;
}
