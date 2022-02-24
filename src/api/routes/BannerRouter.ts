import express, { Router } from 'express';
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
    this.router.post('/', (req, res) => {
      const bannerData = req.body;

      this.bannerController.makeBanner(bannerData);

      return res.status(201).json({ message: 'CREATE_SUCCESS' });
    });

    this.router.get('/', (req, res) => {
      const allBanners = this.bannerController.readAllBanners();

      return res.status(200).json(allBanners);
    });

    this.router.get('/:id', (req, res) => {
      const { id } = req.params;
      const bannerDetail = this.bannerController.readBannerDetail(id);

      return res.status(200).json(bannerDetail);
    });

    this.router.put('/:id', (req, res) => {
      const { id } = req.params;
      const bannerData = req.body;

      this.bannerController.updateBanner(id, bannerData);

      return res.status(200).json({ message: 'UPDATE_SUCCESS' });
    });

    this.router.delete('/:id', (req, res) => {
      const { id } = req.params;

      this.bannerController.deleteBanner(id);

      return res.status(200).json({ message: 'DELETE_SUCCESS' });
    });
  }
}
