import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { ItemToInvoice } from './itemToInvoice.entity';
import { UserModule } from '../user/user.module';
import { InvoiceMapper } from './mapper/InvoiceMapper';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, ItemToInvoice]),
    UserModule,
    ItemModule,
  ],
  providers: [InvoiceService, InvoiceMapper],
  exports: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
