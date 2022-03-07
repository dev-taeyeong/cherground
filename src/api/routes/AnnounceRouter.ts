import express, { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../TYPES';
import { AnnounceController } from '../controller';

export interface AnnounceRouter {
  router: Router;
}

@injectable()
export class AnnounceRouterImpl implements AnnounceRouter {
  router: Router;
  private announceController: AnnounceController;

  constructor(
    @inject(TYPES.AnnounceController) announceController: AnnounceController
  ) {
    this.announceController = announceController;
    this.router = express.Router();

    this.router.post('/', (req: express.Request, res: express.Response) => {});

    this.router.get('/', (req: express.Request, res: express.Response) => {
      const { 'week-start': weekStart, 'current-time': currentTime } =
        req.query as { 'week-start': string; 'current-time': string };

      this.announceController
        .readWeeklyAnnounce(weekStart, currentTime)
        .then((announces) => res.status(200).json(announces));
    });
  }
}
