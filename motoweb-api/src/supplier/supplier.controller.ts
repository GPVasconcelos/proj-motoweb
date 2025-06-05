import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { SupplierService } from '../supplier/supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  // Cadastrar uma nova central fornecedora
  @Post()
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  // Atualizar dados da central fornecedora
  @Patch(':id')
  updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.updateSupplier(id, updateSupplierDto);
  }

  // Remover central fornecedora
  @Delete(':id')
  deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.deleteSupplier(id);
  }

  // Listar todas as centrais fornecedoras
  @Get()
  getAllSuppliers() {
    return this.supplierService.getAllSuppliers();
  }

  // Obter central fornecedora por ID
  @Get(':id')
  getSupplierById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getSupplierById(id);
  }

  // Listar todas as entregas da central fornecedora
  @Get(':id/delivery')
  findDeliveriesBySupplier(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getDeliveryBySupplier(id);
  }

  // Listar entregas pendentes da central fornecedora
  @Get(':userId/delivery/pending')
  getPendingDeliverys(@Param('userId', ParseIntPipe) userId: number) {
    return this.supplierService.getPendingDeliverys(userId);
  }

  // Listar motoboys disponíveis para a central fornecedora
  @Get(':id/motoboys')
  getMotoboys(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getMotoboys(id);
  }

  // Atribuir motoboy a uma entrega
  @Patch(':userId/delivery/:deliveryId/assign')
  assignMotoboy(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('deliveryId', ParseIntPipe) deliveryId: number,
    @Body('motoboyId', ParseIntPipe) motoboyId: number,
  ) {
    return this.supplierService.assignMotoboy(userId, deliveryId, motoboyId);
  }

  // Histórico completo de entregas da central
  @Get(':userId/delivery/history')
  getDeliveryHistory(@Param('userId', ParseIntPipe) userId: number) {
    return this.supplierService.getDeliveryHistory(userId);
  }
}
