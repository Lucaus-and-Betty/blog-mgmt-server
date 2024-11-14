import { Injectable } from '@nestjs/common';
import { LoveListItemTpye } from './love.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Love } from './love.entities';

@Injectable()
export class LoveService {
  constructor(
    @InjectRepository(Love)
    private readonly love: Repository<Love>,
  ) {}

  async findAll() {
    try {
      const loveListItem = await this.love.find({
        order: { publishTime: 'DESC' },
      });
      return loveListItem;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.love.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(project: LoveListItemTpye) {
    const newLoveListItem = new Love();
    newLoveListItem.id = project.id;
    newLoveListItem.title = project.title;
    newLoveListItem.done = project.done;
    newLoveListItem.publishTime = project.publishTime;
    try {
      await this.love.save(newLoveListItem);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
