export interface NoticeService {
  makeNotice(noticeData);
  readAllNotice();
  readNoticeDetail(id: number);
  updateNotice(id: number, noticeData);
  deleteNotice(id: number);
}
