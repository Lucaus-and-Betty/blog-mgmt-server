import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { New } from './news.entities';
import { JWT_CONFIG } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([New]), JwtModule.register(JWT_CONFIG)],
  controllers: [NewsController],
  providers: [NewsService, JwtStrategy],
})
export class NewsModule {}
