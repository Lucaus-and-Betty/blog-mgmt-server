import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { NewsModule } from './apis/news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './constants';
import { ProjectModule } from './apis/project/project.module';
import { LoveModule } from './apis/love/love.module';
import { NovelModule } from './apis/novel/novel.module';
@Module({
  imports: [
    UsersModule,
    NewsModule,
    ProjectModule,
    LoveModule,
    NovelModule,
    TypeOrmModule.forRoot(DB_CONFIG),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
