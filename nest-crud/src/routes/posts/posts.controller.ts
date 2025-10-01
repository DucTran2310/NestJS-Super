import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
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
  getPosts() {
    return this.postService.getPosts()
  }

  @Post()
  @Auth([AUTH_TYPES.Bearer])
  createPost(@Body() body: any, @ActiveUser('userId') userId: number) {
    return this.postService.createPost(userId, body)
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id)
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postService.updatePost(id, body)
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id)
  }
}
