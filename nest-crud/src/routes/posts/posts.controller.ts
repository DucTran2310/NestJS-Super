import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreatePostBodyDTO, GetPostItemDTO, UpdatePostBodyDTO } from 'src/routes/posts/posts.dto'
import { PostsService } from 'src/routes/posts/posts.service'
import { AUTH_TYPES, CONDITIONS_GUARD } from 'src/shared/constants/auth.constant'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // @UseGuards(AccessTokenGuard)
  // @UseGuards(ApiKeyGuard)

  @Auth([AUTH_TYPES.Bearer, AUTH_TYPES.ApiKey], { condition: CONDITIONS_GUARD.AND })
  @Get()
  getPosts(@ActiveUser('userId') userId: number) {
    return this.postService.getPosts(userId).then((posts) => posts.map((post) => new GetPostItemDTO(post)))
  }

  @Post()
  @Auth([AUTH_TYPES.Bearer])
  async createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(await this.postService.createPost(userId, body))
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return new GetPostItemDTO(await this.postService.getPost(Number(id)))
  }

  @Auth([AUTH_TYPES.Bearer])
  @Put(':id')
  async updatePost(@Body() body: UpdatePostBodyDTO, @Param('id') id: string, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(
      await this.postService.updatePost({
        postId: Number(id),
        userId,
        body,
      }),
    )
  }

  @Auth([AUTH_TYPES.Bearer])
  @Delete(':id')
  deletePost(@Param('id') id: string, @ActiveUser('userId') userId: number): Promise<boolean> {
    return this.postService.deletePost({
      postId: Number(id),
      userId,
    })
  }
}
