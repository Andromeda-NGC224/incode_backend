import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'user/user.entity';

@Entity({ name: 'user_avatars' })
export class UserAvatarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ unique: true, nullable: true })
  cloudinaryId: string;

  @Column({ unique: true, name: 'user_id' })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.avatar, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
