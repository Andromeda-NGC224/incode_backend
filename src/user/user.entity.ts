import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Nullable } from 'common/types';
import { UserAvatarEntity } from 'media/media.user.entity';

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

  @OneToOne(() => UserAvatarEntity, (avatar) => avatar.user, { cascade: true })
  avatar: UserAvatarEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
