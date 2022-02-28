import express, { Router } from 'express';
import { Banner } from '../../domain/entities/Banner';
import { BannerController } from '../controller';

export interface BannerRouter {
  router: Router;
}

export class BannerRouterImpl implements BannerRouter {
  router: Router;
  private bannerController: BannerController;

  constructor(bannerController: BannerController) {
    this.bannerController = bannerController;
    this.router = express.Router();

    this.router.post('/reservate', (req, res) => {
      const bannerData: Banner = req.body;

      this.bannerController.makeBanner(bannerData);

      return res.status(201).json({ message: 'CREATE_SUCCESS' });
    });
  }
}
