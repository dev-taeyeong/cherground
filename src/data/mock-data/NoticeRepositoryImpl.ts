import { NoticeRepository } from '../../domain/interactor/repositories';
import data from '../mock-data/Data';
export class NoticeRepositoryImpl implements NoticeRepository {
  constructor() {}

  getNoticeByTypeAndTime(
    type: string,
    startTime: Date,
    endTime: Date
  ): Promise<boolean> {}
}
