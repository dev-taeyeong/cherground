export interface NoticeRepository {
  createNotice();
  readAllNotices();
  readNoticeById();
  updateNoticeById();
  deleteNoticeById();
}

export interface BannerRepository {
  createBanner();
}
