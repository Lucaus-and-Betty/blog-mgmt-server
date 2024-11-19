import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HTTP_STATUS } from 'src/constants';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  // 添加文件
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      // 如果有双反斜杠，变成一个斜杠
      file.path = file.path.replace(/\\/g, '/');
      file.destination = file.destination.replace(/\\/g, '/');
      // 将路径换成 /static
      file.path = file.path.replace(file.destination, '/static');
      return {
        message: 'success',
        data: file,
      };
    } else {
      console.log('error');
      return {
        message: 'error',
        data: null,
      };
    }
  }

  // 删除文件
  @Post('delete')
  async deleteFile(@Body() body: { fileName: string }) {
    const { fileName } = body;
    // 删除文件
    fs.unlinkSync(`/Users/betty/my-projects/blog-imgs/${fileName}`);
    // 检查文件是否存在
    if (fs.existsSync(`/Users/betty/my-projects/blog-imgs/${fileName}`)) {
      return {
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'error',
        data: null,
      };
    }
    return {
      code: HTTP_STATUS.OK,
      message: 'success',
      data: null,
    };
  }
}
