import { NoticeController } from '..';
import { NoticeService } from '../../../domain/service';

export class NoticeControllerImpl implements NoticeController {
  noticeService: NoticeService;
  constructor(noticeService: NoticeService) {
    this.noticeService = noticeService;
  }

  makeNotice(noticeData: any) {
    this.noticeService.makeNotice(noticeData);
  }

  readAllNotices() {
    this.noticeService.readAllNotices();
  }

  readNoticeDetail(id: number) {
    this.noticeService.readNoticeDetail(id);
  }

  updateNotice(id: number, noticeData) {
    this.noticeService.updateNotice(id, noticeData);
  }

  deleteNotice(id: number) {
    this.noticeService.deleteNotice(id);
  }
}
