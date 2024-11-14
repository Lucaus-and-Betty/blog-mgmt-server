import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'love_list' })
export class Love {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'done' })
  done: boolean;

  @Column({ name: 'publish_time' })
  publishTime: string;
}
