import { NoticeService } from '..';
import { NoticeRepository } from '../../interactor/repositories';

export class NoticeServiceImpl implements NoticeService {
  noticeRepository: NoticeRepository;
  constructor(noticeRepository: NoticeRepository) {
    this.noticeRepository = noticeRepository;
  }

  makeNotice(noticeData) {
    this.noticeRepository.createNotice(noticeData);
  }
}
