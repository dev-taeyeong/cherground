import { Banner } from '../entities/Banner';
import { Notice } from '../entities/Notice';
import { OverlapBannerSchedule } from '../entities/OverlapBannerSchedule';
import { Post } from '../entities/Post';

export interface NoticeService {
  makeNotice(notice: Notice): Promise<void | Error>;

  getNoticeDetail(id: number): Promise<Notice>;
  updateNotice(notice: Notice): Promise<void>;
}

export interface BannerService {
  validateBannerOverlap(
    banner: Banner
  ): Promise<OverlapBannerSchedule[] | void>;
  mediateBannerSchedule(
    overlapBannerSchedule: OverlapBannerSchedule[]
  ): Promise<void>;
  makeBanner(banner: Banner): Promise<Banner[] | void>; // 배너 생성

  getBannerDetail(id: number): Promise<Banner>;
  updateBanner(banner: Banner): Promise<void>;
}

export interface PostService {
  getAllPosts(): Promise<Post[]>;
  getPostsList(
    condition: number,
    state: { live: boolean; reservation: boolean; end: boolean }
  ): Promise<Post[]>;
  deletePost(id: number): Promise<void>;
}
