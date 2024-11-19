import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { generateUUID } from 'src/utils/generateUUID';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/constants';
import { DiaryItemTpye } from './diary.interface';
import * as dayjs from 'dayjs';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll() {
    const res = await this.diaryService.findAll();
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
  @Post('add')
  async add(@Body() body: { imgs: string; content: string }) {
    const { imgs, content } = body;
    const newDiary: DiaryItemTpye = {
      id: generateUUID(),
      imgs,
      content,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    const res = await this.diaryService.add(newDiary);
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
  async delete(@Body() body: { id: string }) {
    const { id } = body;
    const res = await this.diaryService.delete(id);
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
