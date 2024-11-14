import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LoveService } from './love.service';
import { LoveListItemTpye } from './love.interface';
import { generateUUID } from 'src/utils/generateUUID';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/constants';
import * as dayjs from 'dayjs';

@Controller('love')
export class LoveController {
  constructor(private readonly loveService: LoveService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    const res = await this.loveService.findAll();
    if (res) {
      return {
        code: HTTP_STATUS.OK,
        message: 'success',
        data: res,
      };
    } else {
      return {
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'error',
        data: null,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteProject(@Body() body: { id: string }) {
    const res = await this.loveService.delete(body.id);
    if (res) {
      return {
        code: HTTP_STATUS.OK,
        message: 'success',
        data: body,
      };
    } else {
      return {
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'error',
        data: null,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateProject(
    @Body()
    body: {
      id: string;
      title: string;
      done: boolean;
      publishTime: string;
    },
  ) {
    const project: LoveListItemTpye = {
      id: body.id,
      title: body.title,
      done: body.done,
      publishTime: body.publishTime,
    };
    const res = await this.loveService.add(project);
    if (res) {
      return {
        code: HTTP_STATUS.OK,
        message: 'success',
        data: body,
      };
    } else {
      return {
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'error',
        data: null,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addProject(@Body() body: { title: string; done: boolean }) {
    const id = generateUUID();
    const news: LoveListItemTpye = {
      id,
      title: body.title,
      done: body.done,
      publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    const res = await this.loveService.add(news);
    if (res) {
      return {
        code: HTTP_STATUS.OK,
        message: 'success',
        data: body,
      };
    } else {
      return {
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'error',
        data: null,
      };
    }
  }
}
