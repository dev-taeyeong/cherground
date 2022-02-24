import { NoticeService } from '..';
import { NoticeRepository } from '../../interactor/repositories';

export class NoticeServiceImpl implements NoticeService {
  noticeRepository: NoticeRepository;
  constructor(noticeRepository: NoticeRepository) {
    this.noticeRepository = noticeRepository;
  }

  makeNotice(noticeData) {
    // 해당 노출 위치, 동일한 시간범위에 있는 공지 조회
    this.noticeRepository.readNoticeByTimeAndSubLocation();

    // 공지 생성
    this.noticeRepository.createNotice(noticeData);
  }

  readAllNotices() {
    this.noticeRepository.readAllNotices();
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
