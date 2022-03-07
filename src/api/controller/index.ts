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
  readWeekBanners(weekStart: Date, currentTime: Date): Promise<Banner[]>;
}
