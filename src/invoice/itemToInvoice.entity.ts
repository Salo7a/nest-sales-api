import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Item } from '../item/item.entity';

@Entity()
export class ItemToInvoice {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public invoiceId: number;

  @Column()
  public itemId: number;

  @Column()
  public quantity: number;

  @Column()
  public totalPrice: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.itemToInvoice)
  public invoice: Invoice;

  @ManyToOne(() => Item, (item) => item.itemToInvoice)
  public item: Item;
}
