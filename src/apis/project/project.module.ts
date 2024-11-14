import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entities';
import { JWT_CONFIG } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, JwtStrategy],
})
export class ProjectModule {}
