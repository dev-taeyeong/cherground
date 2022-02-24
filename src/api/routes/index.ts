import express, { Router } from 'express';
import { BannerRouter } from './BannerRouter';
import { NoticeRouter } from './NoticeRouter';

export interface Routes {
  router: Router;
}

export class RoutesImpl implements Routes {
  router: Router;
  private noticeRouter: NoticeRouter;
  private bannerRouter: BannerRouter;

  constructor(noticeRouter: NoticeRouter, bannerRouter: BannerRouter) {
    this.noticeRouter = noticeRouter;
    this.bannerRouter = bannerRouter;
    this.router = express.Router();
    this.router.use('/notice', this.noticeRouter.router);
    this.router.use('/banner', this.bannerRouter.router);
  }
}
