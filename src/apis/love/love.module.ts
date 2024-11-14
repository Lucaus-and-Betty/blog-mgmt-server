import { Module } from '@nestjs/common';
import { LoveController } from './love.controller';
import { LoveService } from './love.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Love } from './love.entities';
import { JWT_CONFIG } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Love]), JwtModule.register(JWT_CONFIG)],
  controllers: [LoveController],
  providers: [LoveService, JwtStrategy],
})
export class LoveModule {}
