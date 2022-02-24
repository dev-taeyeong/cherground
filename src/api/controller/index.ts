export interface NoticeController {
  makeNotice(noticeData);
  readAllNotices();
  readNoticeDetail(id: number);
  updateNotice(id: number, noticeData);
  deleteNotice(id: number);
}

export interface BannerController {
  makeBanner(bannerData);
}
