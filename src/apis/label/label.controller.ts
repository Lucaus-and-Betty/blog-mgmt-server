import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { LabelService } from './label.service';
import { generateUUID } from 'src/utils/generateUUID';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/constants';
import { LabelItemTpye } from './label.interface';
import * as dayjs from 'dayjs';

@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll() {
    const res = await this.labelService.findAll();
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
  async add(@Body() body: { title: string }) {
    const { title } = body;
    const newLabel: LabelItemTpye = {
      id: generateUUID(),
      title,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    const res = await this.labelService.add(newLabel);
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
    const res = await this.labelService.delete(id);
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
  @Post('update')
  async update(@Body() body: { id: string; title: string }) {
    const { id, title } = body;
    const res = await this.labelService.update(id, title);
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
