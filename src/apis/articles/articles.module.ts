import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from '../label/label.entities';
import { Articles } from './articles.entities';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/constants';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([Label, Articles]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, JwtStrategy],
})
export class ArticlesModule {}
