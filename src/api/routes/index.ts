import express, { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../TYPES';
import { BannerRouter } from './BannerRouter';
import { NoticeRouter } from './NoticeRouter';

export interface Routes {
  router: Router;
}

@injectable()
export class RoutesImpl implements Routes {
  router: Router;
  private noticeRouter: NoticeRouter;
  private bannerRouter: BannerRouter;

  constructor(@inject(TYPES.BannerRouter) bannerRouter: BannerRouter) {
    this.bannerRouter = bannerRouter;
    this.router = express.Router();
    this.router.use('/banner', this.bannerRouter.router);
  }
}
