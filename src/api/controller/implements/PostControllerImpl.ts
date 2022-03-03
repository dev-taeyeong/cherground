import { inject, injectable } from 'inversify';
import { PostController } from '..';
import { PostService } from '../../../domain/service';
import { StateData, TYPES } from '../../../TYPES';

@injectable()
export class PostControllerImpl implements PostController {
  postService: PostService;

  constructor(@inject(TYPES.BannerService) postService: PostService) {
    this.postService = postService;
  }

  getPostList(condition: number, state: StateData) {
    return this.postService.getPostList(condition, state);
  }
}
