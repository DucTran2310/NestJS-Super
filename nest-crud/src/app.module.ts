import { Module } from '@nestjs/common'
import { AuthService } from 'src/routes/auth/auth.service'
import { PostsModule } from 'src/routes/posts/posts.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './routes/auth/auth.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [PostsModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
