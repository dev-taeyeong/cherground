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
      const bannerData: Banner = req.body;

      const overlapData = this.bannerController.makeBanner(bannerData);

      return res.status(201).json(overlapData);
    });

    this.router.get('/:id', (req, res) => {
      const { id }: { id: string } = req.params;

      const bannerData = this.bannerController.readBannerDetail(parseInt(id));

      return res.status(200).json(bannerData);
    });
  }
}
