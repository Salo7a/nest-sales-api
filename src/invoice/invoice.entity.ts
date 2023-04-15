import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { InvoiceStatus } from './enum/inovice.enum';
import { User } from '../user/user.entity';
import { ItemToInvoice } from './itemToInvoice.entity';

@Entity()
export class Invoice {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PLACED })
  status: InvoiceStatus;

  @Column({
    type: 'decimal',
    default: 0,
    nullable: false,
  })
  @Expose()
  total: number;

  @ManyToOne(() => User, (user) => user.invoices)
  @Expose()
  user: User;

  @Expose()
  @Column({ nullable: false })
  userId: number;

  @OneToMany(() => ItemToInvoice, (itemToInvoice) => itemToInvoice.invoice, {
    onDelete: 'CASCADE',
    eager: false,
  })
  public itemToInvoice: ItemToInvoice[];

  @CreateDateColumn()
  @Expose()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
