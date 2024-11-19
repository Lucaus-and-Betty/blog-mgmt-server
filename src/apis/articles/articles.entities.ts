import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Label } from '../label/label.entities';

@Entity({ name: 'article' })
export class Articles {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'publish_time' })
  publishTime: string;

  @Column({ name: 'update_time' })
  updateTime: string;

  @Column({ name: 'read_count' })
  readCount: number;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'cover' })
  cover: string;

  @Column({ name: 'des' })
  des: string;

  @ManyToMany(() => Label)
  @JoinTable()
  labels: Label[];
}
