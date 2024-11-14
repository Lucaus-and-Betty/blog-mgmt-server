import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Novels } from './novel.entities';
import { NovelChapter } from './novel-chapter.entities';

@Injectable()
export class NovelService {
  constructor(
    @InjectRepository(Novels)
    private readonly novels: Repository<Novels>,
    @InjectRepository(NovelChapter)
    private readonly novelChapter: Repository<NovelChapter>,
  ) {}

  async findAllNovels() {
    const res = await this.novels.find();
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  async findNovelDetail(id: string) {
    const res = await this.novels.find({
      where: { id },
    });
    if (res) {
      return res[0];
    } else {
      return null;
    }
  }

  async findAllChapters(id: string) {
    const res = await this.novelChapter
      .createQueryBuilder('novel_chapter')
      .select([
        'novel_chapter.id',
        'novel_chapter.name',
        'novel_chapter.time',
        'novel_chapter.order',
        'novel_chapter.previousId',
      ])
      .where('novel_chapter.novel_id = :id', { id })
      .getMany();
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  async addChapter(
    chapterId: string,
    novelId: string,
    content: string,
    name: string,
    time: string,
  ) {
    // 先查出 order 最大值 以及这条数据的 id
    const { order, id } = await this.novelChapter
      .createQueryBuilder('novel_chapter')
      .select(['novel_chapter.order', 'novel_chapter.id'])
      .where('novel_chapter.novel_id = :novelId', { novelId })
      .orderBy('novel_chapter.order', 'DESC')
      .limit(1)
      .getOne();

    const newChapter = new NovelChapter();
    newChapter.id = chapterId;
    newChapter.novelId = novelId;
    newChapter.content = content;
    newChapter.time = time;
    newChapter.order = order ? order + 1 : 1;
    newChapter.name = name;
    newChapter.previousId = id;
    const res = await this.novelChapter.save(newChapter);
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  async updateChapter(id: string, content: string) {
    const res = await this.novelChapter.update(id, { content });
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  async getChapterInfo(id: string) {
    const res = await this.novelChapter.find({
      where: { id },
    });
    if (res) {
      return res[0];
    } else {
      return null;
    }
  }
}
