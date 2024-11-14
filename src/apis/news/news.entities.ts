import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'new' })
export class New {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'des' })
  des: string;

  @Column({ name: 'time' })
  time: string;

  @Column({ name: 'link' })
  link: string;

  @Column({ name: 'show' })
  show: boolean;
}
