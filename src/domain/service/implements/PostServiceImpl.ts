import { PostService } from '..';
import { Post } from '../../entities/Post';

export class PostServiceImpl implements PostService {
  constructor() {}

  getAllPosts(): Promise<Post[]> {}

  getPostsList(
    condition: number,
    state: { live: boolean; reservation: boolean; end: boolean }
  ): Promise<Post[]> {}

  deletePost(id: number): Promise<void> {}
}
