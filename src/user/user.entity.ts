import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Nullable } from 'common/types';

// TODO remove auth
@Entity('users', { orderBy: { email: 'DESC' } })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string; // Denormalized field from AuthEntity.email

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: Nullable<string>;

  @Column({ type: 'varchar', length: 50, nullable: true })
  surname: Nullable<string>;

  @Column({ nullable: true, type: 'date' })
  birthday: Nullable<Date>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
