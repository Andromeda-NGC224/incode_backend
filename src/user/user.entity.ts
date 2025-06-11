import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Nullable } from 'common/types';

@Entity('users', { orderBy: { email: 'DESC' } })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: Nullable<string>;

  @Column({ type: 'varchar', length: 50, nullable: true })
  surname: Nullable<string>;

  @Column({ nullable: true, type: 'date' })
  birthday: Nullable<Date>;
}
