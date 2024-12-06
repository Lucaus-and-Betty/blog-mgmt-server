import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { NewsModule } from './apis/news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './db.config';
import { ProjectModule } from './apis/project/project.module';
import { LoveModule } from './apis/love/love.module';
import { NovelModule } from './apis/novel/novel.module';
import { DiaryModule } from './apis/diary/diary.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './apis/upload/upload.module';
import { LabelModule } from './apis/label/label.module';
import { ArticlesModule } from './apis/articles/articles.module';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join('/Users/betty/my-projects/blog-imgs'),
      serveRoot: '/static',
    }),
    UsersModule,
    NewsModule,
    ProjectModule,
    LoveModule,
    NovelModule,
    DiaryModule,
    UploadModule,
    LabelModule,
    ArticlesModule,
    TypeOrmModule.forRoot(DB_CONFIG),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
