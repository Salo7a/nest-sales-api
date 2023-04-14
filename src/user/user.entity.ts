import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enum/role';
import { Expose } from 'class-transformer';

@Entity('user')
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Expose()
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Expose()
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @BeforeUpdate()
  @BeforeInsert()
  private async setPassword(password: string) {
    if (password || this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(password || this.password, salt);
    }
  }
}
