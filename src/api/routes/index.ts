import express, { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../TYPES';
import { BannerRouter } from './BannerRouter';
import { DuplicateScheduleRouter } from './DuplicateScheduleRouter';

export interface Routes {
  router: Router;
}

@injectable()
export class RoutesImpl implements Routes {
  router: Router;
  private bannerRouter: BannerRouter;
  private duplicateScheduleRouter: DuplicateScheduleRouter;

  constructor(
    @inject(TYPES.BannerRouter) bannerRouter: BannerRouter,
    @inject(TYPES.DuplicateScheduleRouter)
    duplicateScheduleRouter: DuplicateScheduleRouter
  ) {
    this.bannerRouter = bannerRouter;
    this.duplicateScheduleRouter = duplicateScheduleRouter;
    this.router = express.Router();
    this.router.use('/banner', this.bannerRouter.router);
    this.router.use('/duplicate-schedule', this.duplicateScheduleRouter.router);
  }
}
