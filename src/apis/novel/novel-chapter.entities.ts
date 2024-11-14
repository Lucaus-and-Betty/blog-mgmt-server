import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'novel_chapter' })
export class NovelChapter {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'time' })
  time: string;

  @Column({ name: 'order' })
  order: number;

  @Column({ name: 'novel_id' })
  novelId: string;

  @Column({ name: 'previous_id' })
  previousId: string;

  @Column({ name: 'name' })
  name: string;
}
