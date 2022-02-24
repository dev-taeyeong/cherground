export interface NoticeRepository {
  createNotice(noticeData);
  readAllNotices();
  readNoticeById(id);
  updateNoticeById(id, noticeData);
  deleteNoticeById(id);
}

export interface BannerRepository {
  createBanner(bannerData);
  readAllBanners();
  readBannerById(id);
  updateBannerById(id, bannerData);
  deleteBannerByid(id);
}
