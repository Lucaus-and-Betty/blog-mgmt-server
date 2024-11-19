import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './label.entities';
import { LabelItemTpye } from './label.interface';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private readonly label: Repository<Label>,
  ) {}

  async findAll() {
    try {
      const news = await this.label.find({
        order: { createTime: 'DESC' },
      });
      return news;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(diary: LabelItemTpye) {
    const newLabel = new Label();
    newLabel.id = diary.id;
    newLabel.title = diary.title;
    newLabel.createTime = diary.createTime;
    try {
      await this.label.save(newLabel);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.label.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(id: string, title: string) {
    const res = await this.label.update(id, { title });
    if (res) {
      return res;
    } else {
      return null;
    }
  }
}
