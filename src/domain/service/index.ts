export interface NoticeService {
  makeNotice(noticeData);
  readAllNotices();
  readNoticeDetail(id: number);
  updateNotice(id: number, noticeData);
  deleteNotice(id: number);
}
