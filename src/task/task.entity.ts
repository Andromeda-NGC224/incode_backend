import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'user/user.entity';

@Entity('tasks', { orderBy: { createdAt: 'DESC' } })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;


  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_task_author_id',
  })
  author?: UserEntity;

  @Column({ name: 'author_id', nullable: false })
  authorId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
