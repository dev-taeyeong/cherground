export interface NoticeController {
  makeNotice(noticeData: any);
  readAllNotices();
  readNoticeDetail(id: number);
  updateNotice(id: number, noticeData);
  deleteNotice(id: number);
}
