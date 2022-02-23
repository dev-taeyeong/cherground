import express, { Router } from 'express';
import { NoticeRouter } from './NoticeRouter';

export interface Routes {
  router: Router;
}

export class RoutesImpl {
  router: Router;
  private noticeRouter: NoticeRouter;

  constructor(noticeRouter: NoticeRouter) {
    this.noticeRouter = noticeRouter;
    this.router = express.Router();
    this.router.use('/notice', this.noticeRouter.router);
  }
}
