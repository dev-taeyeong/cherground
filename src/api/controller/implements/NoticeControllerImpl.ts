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
}
