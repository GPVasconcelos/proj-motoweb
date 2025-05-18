import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SupplierService } from '../supplier/supplier.service';
import { DeliveryStatus } from '@prisma/client';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  /*Cadastrar uma Central Fornecedora*/
  @Post()
  async createSupplier(
    @Body() data: { userId: number; fantasyName: string; cnpj: string; operation: string }
  ) {
    return this.supplierService.createSupplier(data.userId, data);
  }

  /*Atualizar Central Fornecedora*/
  @Patch(':id')
  async updateSupplier(@Param('id') id: string, @Body() data: any) {
    return this.supplierService.updateSupplier(parseInt(id), data);
  }

  /*Remover Central Fornecedora*/
  @Delete(':id')
  async deleteSupplier(@Param('id') id: string) {
    return this.supplierService.deleteSupplier(parseInt(id));
  }

  /*Listar Centrais Fornecedora*/
  @Get()
  async getAllSuppliers() {
    return this.supplierService.getAllSuppliers();
  }

  /*Obter Central Fornecedora por ID*/
  @Get(':id')
  async getSupplierById(@Param('id') id: string) {
    return this.supplierService.getSupplierById(parseInt(id));
  }

  /*Visualizar Entregas Pendentes*/
  @Get(':id/deliveries/pending')
  async getPendingDeliveries(@Param('id') id: string) {
    return this.supplierService.getPendingDeliveries(parseInt(id));
  }

  /*Atribuir Motoboy a uma Entrega*/
  @Patch('deliveries/:deliveryId/assign')
  async assignMotoboy(
    @Param('deliveryId') deliveryId: string,
    @Body('motoboyId') motoboyId: number
  ) {
    return this.supplierService.assignMotoboy(parseInt(deliveryId), motoboyId);
  }

  /* Cancelar Entrega */
  @Patch('deliveries/:deliveryId/cancel')
  async cancelDelivery(@Param('deliveryId') deliveryId: string) {
    return this.supplierService.cancelDelivery(parseInt(deliveryId));
  }

  /* Relatório por Status */
  @Get(':id/deliveries/report')
  async getDeliveriesByStatus(
    @Param('id') id: string,
    @Body('status') status: DeliveryStatus
  ) {
    return this.supplierService.getDeliveriesByStatus(parseInt(id), status);
  }

  /* Histórico de Entregas */
  @Get(':id/deliveries/history')
  async getDeliveryHistory(@Param('id') id: string) {
    return this.supplierService.getDeliveryHistory(parseInt(id));
  }
}
