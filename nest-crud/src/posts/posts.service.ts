import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getPosts() {
    console.log('RUNNN');
    return 'All posts';
  }

  createPost(body: any) {
    return body;
  }

  getPost(id: string) {
    return `Post ${id}`;
  }

  updatePost(id: string, body: any) {
    return { id, ...body };
  }

  deletePost(id: string) {
    return `Delete post ${id}`;
  }
}
