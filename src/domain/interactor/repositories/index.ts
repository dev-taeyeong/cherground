export interface NoticeRepository {
  createNotice();
  readAllNotices();
  readNoticeById();
  updateNoticeById();
  deleteNoticeById();
}
