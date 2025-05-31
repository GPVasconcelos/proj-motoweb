import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SupplierService } from '../supplier/supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { DeliveryStatus } from '@prisma/client';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';

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

  //Visualizar Entregas
  @Get(':id/delivery')
  findDeliveriesBySupplier(@Param('id', ParseIntPipe) id: number) {
  return this.supplierService.getDeliveryBySupplier(id);
}

  //Vi sualizar Entregas Pendentes
  @Get(':userid/delivery/pending')
  async getPendingDeliverys(@Param('userid', ParseIntPipe) userId: number) {
    return this.supplierService.getPendingDeliverys(userId);
  }

  //vizualizar motoboys disponiveis
    @Get(':id/motoboys')
  getMotoboys(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getMotoboys(id);
  }

  //Atribuir Motoboy a uma Entrega
  @Patch(':userId/delivery/:deliveryId/assign')
  assignMotoboy(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('deliveryId', ParseIntPipe) deliveryId: number,
    @Body('motoboyId', ParseIntPipe) motoboyId: number,
  ) {
    return this.supplierService.assignMotoboy(userId, deliveryId, motoboyId);
  }

  //Histórico de Entregas
  @Get(':userId/delivery/history')
  async getDeliveryHistory(@Param('userId', ParseIntPipe) userId: number) {
    return this.supplierService.getDeliveryHistory(userId);
  }
}
