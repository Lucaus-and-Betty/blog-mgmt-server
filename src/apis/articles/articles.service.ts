import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticleInfoType,
  ArticleHTMLInfoType,
  UpdateEditArticleInfoType,
} from './articles.interface';
import { Articles } from './articles.entities';
import { Label } from '../label/label.entities';
import mdParse from 'src/utils/mdParse';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
    @InjectRepository(Label)
    private readonly labelsRepository: Repository<Label>,
  ) {}

  /**
   * @description 获取所有文章
   * @returns { Promise<ArticleInfoType> } 文章信息数组
   */
  async getAllArticle(): Promise<Articles[] | null> {
    try {
      const res = await this.articlesRepository
        .createQueryBuilder('articles')
        .select([
          'articles.id',
          'articles.title',
          'articles.cover',
          'articles.publishTime',
          'articles.readCount',
          'articles.updateTime',
          'articles.des',
        ])
        .leftJoinAndSelect('articles.labels', 'labels')
        .orderBy('articles.publishTime', 'DESC')
        .getMany();
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getArticleById(id: string): Promise<ArticleHTMLInfoType | null> {
    try {
      const res = await this.articlesRepository.find({
        relations: ['labels'],
        where: { id },
      });
      const newContent = {
        id: res[0].id,
        title: res[0].title,
        publishTime: res[0].publishTime,
        updateTime: res[0].updateTime,
        readCount: res[0].readCount,
        content: res[0].content,
        cover: res[0].cover,
        labels: res[0].labels,
        des: res[0].des,
        contentHTML: await mdParse(res[0].content),
      };
      return newContent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.articlesRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAllArticleInfoById(id: string): Promise<Articles[] | null> {
    try {
      const res = await this.articlesRepository
        .createQueryBuilder('articles')
        .select([
          'articles.id',
          'articles.title',
          'articles.cover',
          'articles.publishTime',
          'articles.des',
        ])
        .leftJoinAndSelect('articles.labels', 'labels')
        .where('articles.id = :id', { id })
        .getMany();
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * @description 通过id获取文章内容
   * @param { string } id
   * @returns { Promise<ArticleInfoType> } 文章信息
   */
  async getArticleContentById(id: string): Promise<Articles[] | null> {
    try {
      const res = await this.articlesRepository.find({
        relations: ['labels'],
        where: { id },
      });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getArticleInfoByLabelId(
    id: string,
    page: number,
    pageSize: number = 30,
  ): Promise<{ isOver: boolean; data: Articles[] } | null> {
    try {
      const res = await this.articlesRepository
        .createQueryBuilder('articles')
        .select(['articles.id'])
        .leftJoinAndSelect('articles.labels', 'labels')
        .where('labels.id = :id', { id })
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getMany();
      const total = await this.articlesRepository.count({
        where: { labels: { id } },
      });
      const isOver = total <= (page - 1) * pageSize + pageSize;
      const articles: Articles[] = [];
      for (let i = 0; i < res.length; i++) {
        const articleRes = await this.getAllArticleInfoById(res[i].id);
        if (articleRes) {
          articles.push(articleRes[0]);
        }
      }
      return { isOver, data: articles };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addArticles(article: ArticleInfoType) {
    try {
      const labelsArr = [];
      for (let i = 0; i < article.labels.length; i++) {
        const res = await this.labelsRepository.find({
          where: { id: article.labels[i] },
        });
        if (res.length > 0) {
          labelsArr.push(res[0]);
        }
      }
      const newArticle = new Articles();
      newArticle.id = article.id;
      newArticle.title = article.title;
      newArticle.labels = labelsArr;
      newArticle.content = article.content;
      newArticle.publishTime = article.publishTime;
      newArticle.updateTime = article.updateTime;
      newArticle.readCount = article.readCount;
      newArticle.cover = article.cover;
      newArticle.des = article.des;
      const res = await this.articlesRepository.save(newArticle);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateArticles(article: UpdateEditArticleInfoType) {
    try {
      const labelsArr = [];
      for (let i = 0; i < article.labels.length; i++) {
        const res = await this.labelsRepository.find({
          where: { id: article.labels[i] },
        });
        if (res.length > 0) {
          labelsArr.push(res[0]);
        }
      }
      const newArticle = new Articles();
      newArticle.id = article.id;
      newArticle.title = article.title;
      newArticle.labels = labelsArr;
      newArticle.content = article.content;
      newArticle.updateTime = article.updateTime;
      newArticle.readCount = article.readCount;
      newArticle.cover = article.cover;
      newArticle.des = article.des;
      const res = await this.articlesRepository.save(newArticle);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
