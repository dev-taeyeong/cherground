import express, { Router } from 'express';
import { NoticeController } from '../controller';

export interface NoticeRouter {
  router: Router;
}

export class NoticeRouterImpl implements NoticeRouter {
  router: Router;
  private noticeController: NoticeController;

  constructor(noticeController: NoticeController) {
    this.noticeController = noticeController;
    this.router = express.Router();
    this.router.post('/', (req, res) => {
      const noticeData: any = req.body;
      this.noticeController.makeNotice(noticeData);
    });
  }
}
