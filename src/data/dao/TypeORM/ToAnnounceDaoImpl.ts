import { injectable } from 'inversify';
import { AnnounceDao } from '..';
import { Announce } from '../../../domain/entities/Announce';

@injectable()
export class ToAnnounceDaoImpl implements AnnounceDao {
  createAnnounce(announce: Announce): Promise<void> {}
  getWeeklyAnnouncesByWeekStart(weekStart: string): Promise<Announce[]> {}
}
