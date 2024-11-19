import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  ArticleInfoType,
  UpdateEditArticleInfoType,
} from './articles.interface';
import generateUUID from 'src/utils/generateUUID';
import * as dayjs from 'dayjs';
import mdParse from 'src/utils/mdParse';
import { HTTP_STATUS } from 'src/constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllArticle() {
    const res = await this.articlesService.getAllArticle();
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
  @Post('get-by-id')
  async getArticleById(@Body() body: { id: string }) {
    const { id } = body;
    const res = await this.articlesService.getArticleById(id);
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
  @Post('md-parse')
  async mdParse(@Body() body: { content: string }) {
    const { content } = body;
    const parseMdRes = await mdParse(content);
    if (!parseMdRes) {
      return {
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'error',
        data: null,
      };
    }
    return {
      code: HTTP_STATUS.OK,
      message: 'success',
      data: { contentHTML: parseMdRes },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async delete(@Body() body: { id: string }) {
    const { id } = body;
    const res = await this.articlesService.delete(id);
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
  @Post('add-articles')
  async addArticles(
    @Body()
    body: {
      title: string;
      content: string;
      des: string;
      labels: string[];
      cover: string;
      readCount: number;
    },
  ) {
    const { title, content, labels, cover, des, readCount } = body;
    const article: ArticleInfoType = {
      id: generateUUID(),
      title,
      publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      content,
      readCount,
      cover,
      labels,
      des,
    };
    const res = await this.articlesService.addArticles(article);
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
  async updateArticles(
    @Body()
    body: {
      id: string;
      title: string;
      readCount: number;
      content: string;
      des: string;
      labels: string[];
      cover: string;
    },
  ) {
    const { id, title, content, labels, cover, des, readCount } = body;
    const article: UpdateEditArticleInfoType = {
      id,
      title,
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      readCount,
      content,
      cover,
      labels,
      des,
    };
    const res = await this.articlesService.updateArticles(article);
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
