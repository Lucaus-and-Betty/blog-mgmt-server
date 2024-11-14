import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'project' })
export class Project {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'blow' })
  blow: string;

  @Column({ name: 'link' })
  link: string;
}
