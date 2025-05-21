import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SupplierService } from '../supplier/supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { DeliveryStatus } from '@prisma/client';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  //Cadastrar uma Central Fornecedora
  @Post()
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  //Atualizar Central Fornecedora
  @Patch(':id')
  updateSupplier(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto
  ) {
    return this.supplierService.updateSupplier(parseInt(id), updateSupplierDto);
  }

  //Remover Central Fornecedora
  @Delete(':id')
  async deleteSupplier(@Param('id') id: string) {
    return this.supplierService.deleteSupplier(parseInt(id));
  }

  //Listar Centrais Fornecedora
  @Get()
  async getAllSuppliers() {
    return this.supplierService.getAllSuppliers();
  }

  //Obter Central Fornecedora por ID
  @Get(':id')
  async getSupplierById(@Param('id') id: string) {
    return this.supplierService.getSupplierById(parseInt(id));
  }

  //Visualizar Entregas Pendentes
  @Get(':id/delivery/pending')
  async getPendingDeliverys(@Param('id') id: string) {
    return this.supplierService.getPendingDeliverys(parseInt(id));
  }

  //Atribuir Motoboy a uma Entrega
  @Patch('delivery/:deliveryId/assign')
  async assignMotoboy(
    @Param('deliveryId') deliveryId: string,
    @Body('motoboyId') motoboyId: number
  ) {
    return this.supplierService.assignMotoboy(parseInt(deliveryId), motoboyId);
  }

  //Cancelar Entrega
  @Patch('delivery/:deliveryId/cancel')
  async cancelDelivery(@Param('deliveryId') deliveryId: string) {
    return this.supplierService.cancelDelivery(parseInt(deliveryId));
  }

  //Relatório por Status
  @Get(':id/delivery/report')
  async getDeliverysByStatus(
    @Param('id') id: string,
    @Body('status') status: DeliveryStatus
  ) {
    return this.supplierService.getDeliverysByStatus(parseInt(id), status);
  }

  //Histórico de Entregas
  @Get(':id/delivery/history')
  async getDeliveryHistory(@Param('id') id: string) {
    return this.supplierService.getDeliveryHistory(parseInt(id));
  }
}
