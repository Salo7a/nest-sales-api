import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ItemToInvoice } from '../invoice/itemToInvoice.entity';

@Entity()
export class Item {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    default: 0,
    nullable: false,
  })
  @Expose()
  price: number;

  @Column({
    default: 0,
    nullable: false,
  })
  @Expose()
  stock: number;

  @OneToMany(() => ItemToInvoice, (itemToInvoice) => itemToInvoice.item, {
    onDelete: 'RESTRICT',
  })
  public itemToInvoice: ItemToInvoice[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
