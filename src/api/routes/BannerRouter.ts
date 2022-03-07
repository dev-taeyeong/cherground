import express, { Router } from 'express';
import { inject, injectable } from 'inversify';
import { Banner } from '../../domain/entities/Banner';
import { TYPES } from '../../TYPES';
import { BannerController } from '../controller';

export interface BannerRouter {
  router: Router;
}

@injectable()
export class BannerRouterImpl implements BannerRouter {
  router: Router;
  private bannerController: BannerController;

  constructor(
    @inject(TYPES.BannerController) bannerController: BannerController
  ) {
    this.bannerController = bannerController;
    this.router = express.Router();

    this.router.post('/', (req, res) => {
      const banner: Banner = req.body;

      this.bannerController
        .makeBanner(banner)
        .then((data) => res.status(201).json(data));
    });

    this.router.post('/week', (req, res) => {
      const { weekStart, currentTime }: { weekStart: Date; currentTime: Date } =
        req.body;

      this.bannerController
        .readWeekBanners(weekStart, currentTime)
        .then((banners) => res.status(200).json(banners));
    });
  }
}
