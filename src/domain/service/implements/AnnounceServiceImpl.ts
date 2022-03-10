import { inject, injectable } from 'inversify';
import { AnnounceService } from '..';
import { TYPES } from '../../../TYPES';
import { Announce } from '../../entities/Announce';
import { AnnounceRepository } from '../../interactor/repositories';

@injectable()
export class AnnounceServiceImpl implements AnnounceService {
  private announceRepository: AnnounceRepository;

  constructor(
    @inject(TYPES.AnnounceRepository) announceRepository: AnnounceRepository
  ) {
    this.announceRepository = announceRepository;
  }

  makeAnnounce(announce: Announce): Promise<void> {}

  readWeeklyAnnounce(
    weekStart: string,
    currentTime: string
  ): Promise<Announce[]> {
    return this.announceRepository
      .getWeeklyAnnouncesByWeekStart(weekStart)
      .then((weeklyAnnounces) => {
        weeklyAnnounces.forEach((weeklyAnnounce) => {
          if (
            new Date(weeklyAnnounce.startTime).getTime() <=
              new Date(currentTime).getTime() &&
            new Date(weeklyAnnounce.endTime).getTime() >
              new Date(currentTime).getTime()
          ) {
            weeklyAnnounce.state = 'live';
          } else if (
            new Date(weeklyAnnounce.startTime).getTime() <=
              new Date(currentTime).getTime() &&
            new Date(weeklyAnnounce.endTime).getTime() <=
              new Date(currentTime).getTime()
          ) {
            weeklyAnnounce.state = 'end';
          } else {
            weeklyAnnounce.state = 'reservation';
          }
        });

        return weeklyAnnounces;
      });
  }
}
