import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from './diary.entities';
import { DiaryItemTpye } from './diary.interface';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diary: Repository<Diary>,
  ) {}

  async findAll() {
    try {
      const news = await this.diary.find({
        order: { time: 'DESC' },
      });
      news.map((item) => {
        item.imgs = JSON.parse(item.imgs);
      });
      return news;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(diary: DiaryItemTpye) {
    const newDiary = new Diary();
    newDiary.id = diary.id;
    newDiary.content = diary.content;
    newDiary.time = diary.time;
    newDiary.imgs = diary.imgs;
    try {
      await this.diary.save(newDiary);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.diary.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
