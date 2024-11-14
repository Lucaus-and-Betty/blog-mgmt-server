import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'novel' })
export class Novels {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'publish_time' })
  publishTime: string;

  @Column({ name: 'update_time' })
  updateTime: string;

  @Column({ name: 'author' })
  author: string;

  @Column({ name: 'count' })
  count: number;

  @Column({ name: 'des' })
  des: string;

  @Column({ name: 'cover' })
  cover: string;
}
