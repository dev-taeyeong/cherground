import express, { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../TYPES';
import { AnnounceRouter } from './AnnounceRouter';
import { BannerRouter } from './BannerRouterImpl';
import { DuplicateScheduleRouter } from './DuplicateScheduleRouterImpl';

export interface Routes {
  router: Router;
}

@injectable()
export class RoutesImpl implements Routes {
  router: Router;
  private bannerRouter: BannerRouter;
  private duplicateScheduleRouter: DuplicateScheduleRouter;
  private announceRouter: AnnounceRouter;

  constructor(
    @inject(TYPES.BannerRouter) bannerRouter: BannerRouter,
    @inject(TYPES.DuplicateScheduleRouter)
    duplicateScheduleRouter: DuplicateScheduleRouter,
    @inject(TYPES.AnnounceRouter) announceRouter: AnnounceRouter
  ) {
    this.router = express.Router();

    this.bannerRouter = bannerRouter;
    this.duplicateScheduleRouter = duplicateScheduleRouter;
    this.announceRouter = announceRouter;

    this.router.use('/banner', this.bannerRouter.router);
    this.router.use('/duplicate-schedule', this.duplicateScheduleRouter.router);
    this.router.use('/announce', this.announceRouter.router);
  }
}
