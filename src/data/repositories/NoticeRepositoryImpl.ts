import { NoticeRepository } from '../../domain/interactor/repositories';
import { NoticeDao } from '../dao';

export class NoticeRepoitoryImpl implements NoticeRepository {
  noticeDao: NoticeDao;

  constructor(noticeDao: NoticeDao) {
    this.noticeDao = noticeDao;
  }

  createNotice(noticeData) {
    this.noticeDao.createNotice(noticeData);
  }
}
