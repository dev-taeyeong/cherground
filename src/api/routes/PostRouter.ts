import express, { Router } from 'express';
import { inject, injectable } from 'inversify';
import { StateData, TYPES } from '../../TYPES';
import { PostController } from '../controller';

export interface PostRouter {}

@injectable()
export class PostRouterImpl {
  router: Router;
  private postController: PostController;

  constructor(@inject(TYPES.BannerController) postController: PostController) {
    this.postController = postController;
    this.router = express.Router();

    this.router.use('/', (req, res) => {
      const { condition, state }: { condition: number; state: StateData } =
        req.body;
      const postDatas = this.postController.getPostList(condition, state);

      res.status(200).json(postDatas);
    });
  }
}
