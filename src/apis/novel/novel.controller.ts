import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NovelService } from './novel.service';
import { generateUUID } from 'src/utils/generateUUID';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/constants';
import * as dayjs from 'dayjs';

@Controller('novel')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    const res = await this.novelService.findAllNovels();
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
  @Post('info')
  async findDetail(@Body() body: { id: string }) {
    const res = await this.novelService.findNovelDetail(body.id);
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
  @Post('all-chapter-info')
  async findAllChapter(@Body() body: { id: string }) {
    const res = await this.novelService.findAllChapters(body.id);
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
  @Post('add-chapter')
  async addChapter(
    @Body() body: { novelId: string; content: string; name: string },
  ) {
    const res = await this.novelService.addChapter(
      generateUUID(),
      body.novelId,
      body.content,
      body.name,
      dayjs().format('YYYY-MM-DD'),
    );
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
  @Post('update-chapter')
  async updateChapter(@Body() body: { id: string; content: string }) {
    const res = await this.novelService.updateChapter(body.id, body.content);
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
  @Post('get-chapter-info')
  async getChapterInfo(@Body() body: { id: string }) {
    const res = await this.novelService.getChapterInfo(body.id);
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
}
