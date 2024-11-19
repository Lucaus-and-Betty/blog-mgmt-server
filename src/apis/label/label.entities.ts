import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'article_label' })
export class Label {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'create_time' })
  createTime: string;
}
