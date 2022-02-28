export interface NoticeController {
  makeNotice(noticeData);
  readAllNotices();
  readNoticeDetail(id: number);
  updateNotice(id: number, noticeData);
  deleteNotice(id: number);
}

export interface BannerController {
  makeBanner(bannerData);
  readAllBanners();
  readBannerDetail(id: number);
  updateBanner(id: number, bannerData);
  deleteBanner(id: number);
}

export interface ContentController {
  readAllContents();
}
