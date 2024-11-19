import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'diary' })
export class Diary {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'time' })
  time: string;

  @Column({ name: 'imgs' })
  imgs: string;
}
