import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { HasAnyRole } from '../common/decorator/hasAnyRole';
import { Role } from '../common/enum/role';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceDto } from './dto';
import { Message } from '../common/response/message';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@ApiBearerAuth()
@ApiTags('Invoices')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOperation({ summary: 'Get Current User Invoices' })
  @Get('/my')
  async getCurrentInvoices(@Request() req): Promise<InvoiceDto[]> {
    return await this.invoiceService.getCurrentInvoices(req.user.id);
  }

  @ApiOperation({ summary: '[ADMIN] Get All Invoices' })
  @Get('/all')
  @HasAnyRole([Role.ADMIN])
  async getAllInvoices(): Promise<InvoiceDto[]> {
    return await this.invoiceService.getAllInvoices();
  }

  @ApiOperation({
    summary: 'Get Invoice With The Given Id',
    description:
      'A normal user can only get his own invoices, an admin can get any',
  })
  @ApiParam({ name: 'id', description: 'Invoice id' })
  @Get('/:id')
  async getInvoice(@Request() req, @Param() params): Promise<InvoiceDto> {
    return await this.invoiceService.getInvoice(params.id, req.user);
  }

  @ApiOperation({
    summary: 'Update Invoice status',
    description:
      'Once placed, a user can only cancel an invoice while an admin can set it as delivered or cancelled, no one can edit a cancelled or delivered invoice',
  })
  @ApiParam({ name: 'id', description: 'Invoice id' })
  @Patch('/:id')
  async patchInvoiceStatus(
    @Request() req,
    @Param() params,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Message<InvoiceDto>> {
    return await this.invoiceService.patchInvoiceStatus(
      params.id,
      req.user,
      updateInvoiceDto.status,
    );
  }

  @ApiOperation({ summary: 'Create a New Invoice' })
  @Post('/')
  async postInvoice(
    @Request() req,
    @Body() newInvoiceItems: CreateInvoiceDto,
  ): Promise<InvoiceDto> {
    return await this.invoiceService.postInvoice(req.user, newInvoiceItems);
  }
}
