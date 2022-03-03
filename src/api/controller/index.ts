import { Banner } from '../../domain/entities/Banner';
import { Post } from '../../domain/entities/Post';
import { StateData } from '../../TYPES';

export interface NoticeController {
  makeNotice(noticeData);
  readAllNotices();
  readNoticeDetail(id: number);
  updateNotice(id: number, noticeData);
  deleteNotice(id: number);
}

export interface BannerController {
  makeBanner(bannerData);
  readBannerDetail(id: number): Promise<Banner>;
}

export interface PostController {
  getPostList(condition: number, state: StateData): Promise<Post>;
}
