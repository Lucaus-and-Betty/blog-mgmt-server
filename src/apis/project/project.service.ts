import { Injectable } from '@nestjs/common';
import { ProjectItemTpye } from './project.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entities';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projects: Repository<Project>,
  ) {}

  async findAll() {
    try {
      const news = await this.projects.find();
      return news;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteProject(id: string) {
    try {
      await this.projects.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addNew(project: ProjectItemTpye) {
    const newProject = new Project();
    newProject.id = project.id;
    newProject.title = project.title;
    newProject.blow = project.blow;
    newProject.link = project.link;
    try {
      // 先检查有没有重复
      await this.projects.save(newProject);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
