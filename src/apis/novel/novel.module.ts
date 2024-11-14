import { Module } from '@nestjs/common';
import { NovelController } from './novel.controller';
import { NovelService } from './novel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novels } from './novel.entities';
import { NovelChapter } from './novel-chapter.entities';
import { JWT_CONFIG } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Novels]),
    TypeOrmModule.forFeature([NovelChapter]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [NovelController],
  providers: [NovelService, JwtStrategy],
})
export class NovelModule {}
