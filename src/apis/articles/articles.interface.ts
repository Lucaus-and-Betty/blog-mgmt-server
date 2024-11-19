import { Label } from '../label/label.entities';

export interface ArticleInfoType {
  id: string;
  title: string;
  publishTime: string;
  updateTime: string;
  readCount: number;
  content: string;
  cover: string;
  labels: string[];
  des: string;
}

export interface ArticleHTMLInfoType {
  id: string;
  title: string;
  publishTime: string;
  updateTime: string;
  readCount: number;
  content: string;
  cover: string;
  labels: Label[];
  des: string;
  contentHTML: string;
}

export interface UpdateEditArticleInfoType {
  id: string;
  title: string;
  readCount: number;
  content: string;
  cover: string;
  des: string;
  labels: string[];
  updateTime: string;
}
