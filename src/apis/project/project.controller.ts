import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectItemTpye } from './project.interface';
import { generateUUID } from 'src/utils/generateUUID';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/constants';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    const res = await this.projectService.findAll();
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
    const res = await this.projectService.deleteProject(body.id);
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
      link: string;
      blow: string;
    },
  ) {
    const project: ProjectItemTpye = {
      id: body.id,
      title: body.title,
      link: body.link,
      blow: body.blow,
    };
    const res = await this.projectService.addNew(project);
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
  async addProject(
    @Body() body: { title: string; link: string; blow: string },
  ) {
    const id = generateUUID();
    const news: ProjectItemTpye = {
      id,
      title: body.title,
      link: body.link,
      blow: body.blow,
    };
    const res = await this.projectService.addNew(news);
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
