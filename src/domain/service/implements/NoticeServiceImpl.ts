import { NoticeService } from '..';
import { Notice } from '../../entities/Notice';
import { NoticeRepository } from '../../interactor/repositories';

export class NoticeServiceImpl implements NoticeService {
  noticeRepository: NoticeRepository;
  constructor(noticeRepository: NoticeRepository) {
    this.noticeRepository = noticeRepository;
  }

  validateNoticeOverlap(notice: Notice): Promise<boolean> {
    return this.noticeRepository.getNoticeByTypeAndTime(
      notice.type,
      notice.startTime,
      notice.endTime
    );
  }

  makeNotice(notice: Notice): Promise<void> {}
}
