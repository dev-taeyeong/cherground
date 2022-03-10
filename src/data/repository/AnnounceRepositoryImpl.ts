import { inject, injectable } from 'inversify';
import { AnnounceDao } from '../dao';
import { Announce } from '../../domain/entities/Announce';
import { AnnounceRepository } from '../../domain/interactor/repositories';
import { TYPES } from '../../TYPES';

@injectable()
export class AnnounceRepositoryImpl implements AnnounceRepository {
  announceDao: AnnounceDao;

  constructor(@inject(TYPES.AnnounceDao) announceDao: AnnounceDao) {
    this.announceDao = announceDao;
  }
  createAnnounce(announce: Announce): Promise<void> {}
  getWeeklyAnnouncesByWeekStart(weekStart: string): Promise<Announce[]> {}
}
