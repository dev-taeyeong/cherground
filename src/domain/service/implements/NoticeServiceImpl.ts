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

  readAllNotice() {
    this.noticeRepository.readAllNotice();
  }

  readNoticeDetail(id: number) {
    this.noticeRepository.readNoticeById();
  }

  updateNotice(id: number, noticeData) {
    this.noticeRepository.updateNoticeById();
  }

  deleteNotice(id: number) {
    this.noticeRepository.deleteNoticeById();
  }
}
