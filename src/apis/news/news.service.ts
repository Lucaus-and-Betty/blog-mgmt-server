import { Injectable } from '@nestjs/common';
import { NewItemTpye } from './news.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { New } from './news.entities';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New)
    private readonly news: Repository<New>,
  ) {}

  async findAll() {
    try {
      const news = await this.news.find({
        order: { time: 'DESC' },
      });
      return news;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteNew(id: string) {
    try {
      await this.news.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addNew(news: NewItemTpye) {
    const newNews = new New();
    newNews.id = news.id;
    newNews.des = news.des;
    newNews.link = news.link;
    newNews.show = news.show;
    newNews.time = news.time;
    try {
      // 先检查有没有重复
      await this.news.save(newNews);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
