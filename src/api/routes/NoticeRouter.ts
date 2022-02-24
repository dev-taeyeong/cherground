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
      const noticeData = req.body;

      this.noticeController.makeNotice(noticeData);

      return res.status(201).json({ message: 'CREATE_SUCCESS' });
    });

    this.router.get('/', (req, res) => {
      const allNotices = this.noticeController.readAllNotices();

      return res.status(200).json(allNotices);
    });

    this.router.get('/:id', (req, res) => {
      const { id } = req.params;
      const noticeDetail = this.noticeController.readNoticeDetail(id);

      return res.status(200).json(noticeDetail);
    });

    this.router.put('/:id', (req, res) => {
      const { id } = req.params;
      const noticeData = req.body;

      this.noticeController.updateNotice(id, noticeData);

      return res.status(200).json({ message: 'UPDATE_SUCCESS' });
    });

    this.router.delete('/:id', (req, res) => {
      const { id } = req.params;

      this.noticeController.deleteNotice(id);

      return res.status(200).json({ message: 'DELETE_SUCCESS' });
    });
  }
}
