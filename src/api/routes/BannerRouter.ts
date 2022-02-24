import express, { Router } from 'express';
import { BannerController } from '../controller';

export interface BannerRouter {
  router: Router;
}

export class BannerRouterImpl implements BannerRouter {
  router: Router;
  private BannerController: BannerController;

  constructor(BannerController: BannerController) {
    this.BannerController = BannerController;
    this.router = express.Router();
    this.router.post('/', (req, res) => {
      const BannerData = req.body;

      this.BannerController.makeBanner(BannerData);

      return res.status(201).json({ message: 'CREATE_SUCCESS' });
    });

    this.router.get('/', (req, res) => {
      const allBanners = this.BannerController.readAllBanners();

      return res.status(200).json(allBanners);
    });

    this.router.get('/:id', (req, res) => {
      const { id } = req.params;
      const BannerDetail = this.BannerController.readBannerDetail(id);

      return res.status(200).json(BannerDetail);
    });

    this.router.put('/:id', (req, res) => {
      const { id } = req.params;
      const BannerData = req.body;

      this.BannerController.updateBanner(id, BannerData);

      return res.status.(200).json({message: 'UPDATE_SUCCESS'})
    });

    this.router.delete('/:id', (req, res)=> {
      const {id} = req.params;

      this.BannerController.deleteBanner(id);

      return res.status(200).json({message: 'DELETE_SUCCESS'})
    })
  }
}
