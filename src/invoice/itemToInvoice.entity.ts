import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Item } from '../item/item.entity';
import { Expose } from 'class-transformer';

@Entity()
export class ItemToInvoice {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public invoiceId: number;

  @Column()
  @Expose()
  public itemId: number;

  @Column()
  @Expose()
  public quantity: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    default: 0,
    nullable: false,
  })
  @Expose()
  public totalPrice: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.itemToInvoice)
  public invoice: Invoice;

  @ManyToOne(() => Item, (item) => item.itemToInvoice, { eager: true })
  @Expose()
  public item: Item;
}
