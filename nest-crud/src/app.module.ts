import { Module } from '@nestjs/common'
import { PostsModule } from 'src/routes/posts/posts.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [PostsModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
