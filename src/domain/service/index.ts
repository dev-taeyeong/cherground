import { Banner } from '../entities/Banner';
import { Announce } from '../entities/Announce';
import { DuplicateSchedule } from '../entities/DuplicateSchedule';
import { BannerExposePlace } from '../entities/BannerExposePlace';
import { Service } from '../entities/Service';

export interface DuplicateScheduleService {
  adjustDuplicateSchedules(
    title: string,
    service: Service,
    bannerExposePlace: BannerExposePlace,
    isLink: boolean,
    connectionLink: string,
    bannerImgUrl: string,
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
