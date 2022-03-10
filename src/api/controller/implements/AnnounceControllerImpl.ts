import { inject, injectable } from 'inversify';
import { AnnounceController } from '..';
import { Announce } from '../../../domain/entities/Announce';
import { AnnounceService } from '../../../domain/service';
import { TYPES } from '../../../TYPES';

@injectable()
export class AnnounceControllerImpl implements AnnounceController {
  private announceService: AnnounceService;

  constructor(@inject(TYPES.AnnounceService) announceService: AnnounceService) {
    this.announceService = announceService;
  }

  makeAnnounce(announce: Announce): Promise<void> {}

  readWeeklyAnnounce(
    weekStart: string,
    currentTime: string
  ): Promise<Announce[]> {
    return this.announceService.readWeeklyAnnounce(weekStart, currentTime);
  }
}
