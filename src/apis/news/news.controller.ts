import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewItemTpye } from './news.interface';
import { generateUUID } from 'src/utils/generateUUID';
import * as dayjs from 'dayjs';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/constants';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    const res = await this.newsService.findAll();
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
    const res = await this.newsService.deleteNew(body.id);
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
      des: string;
      link: string;
      show: boolean;
      time: string;
    },
  ) {
    const news: NewItemTpye = {
      id: body.id,
      des: body.des,
      link: body.link,
      show: body.show,
      time: body.time,
    };
    const res = await this.newsService.addNew(news);
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
  async addProject(@Body() body: { des: string; link: string; show: boolean }) {
    const id = generateUUID();
    const news: NewItemTpye = {
      id,
      des: body.des,
      link: body.link,
      show: body.show || false,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    const res = await this.newsService.addNew(news);
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
