import { CalendarData, StateData } from '../../TYPES';
import { Banner } from '../entities/Banner';
import { MediaLocation } from '../entities/MediaLocation';
import { Notice } from '../entities/Notice';
import { OverlapBannerSchedule } from '../entities/OverlapBannerSchedule';
import { Post } from '../entities/Post';
import { ProductType } from '../entities/ProductType';

export interface NoticeService {
  validateNoticeOverlap(notice: Notice): Promise<boolean>;
  makeNotice(notice: Notice): Promise<void>;

  getNoticeDetail(id: number): Promise<Notice>;
  updateNotice(id: number, notice: Notice): Promise<void>;
}

export interface BannerService {
  getOverlapBannerSchedules(
    title: string,
    productType: ProductType,
    mediaLocation: MediaLocation,
    startTime: Date,
    endTime: Date
  ): Promise<OverlapBannerSchedule[] | void>;

  // makeBanner(
  //   banner: Banner,
  //   overlapBannerSchedule: OverlapBannerSchedule
  // ): Promise<void>; // 배너 생성

  getBannerDetail(id: number): Promise<Banner>;
  // // getCopyBannerDetail(id: number): Promise<Banner>; title 뒤에 '(1)' 붙이기

  // updateBanner(id: number, banner: Banner): Promise<void>;
}

export interface PostService {
  getCalendarData(startDate: Date, endDate: Date): Promise<CalendarData>;

  getPostList(condition: number, state: StateData): Promise<Post[]>;

  deletePost(id: number): Promise<void>;
}
