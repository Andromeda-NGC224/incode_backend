import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'user/user.entity';
import { AuthProvider } from './auth.types';
import { Nullable } from 'common/types';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL })
  provider: AuthProvider;

  @Column()
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  password: Nullable<string>;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
