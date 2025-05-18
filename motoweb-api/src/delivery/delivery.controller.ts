import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryStatus } from '@prisma/client';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  /* Criar uma Entrega */
  @Post(':clientId')
  async createDelivery(
    @Param('clientId') clientId: string,
    @Body() data: { supplierId: number; pickup: string; destination: string; recipient: string; serviceType: string }
  ) {
    return this.deliveryService.createDelivery(parseInt(clientId), data);
  }

  /* Atualizar o Status da Entrega */
  @Patch(':id/status')
  async updateDeliveryStatus(
    @Param('id') id: string,
    @Body('status') status: DeliveryStatus
  ) {
    return this.deliveryService.updateDeliveryStatus(parseInt(id), status);
  }

  /* Consultar uma Entrega Específica */
  @Get(':id')
  async getDeliveryById(@Param('id') id: string) {
    return this.deliveryService.getDeliveryById(parseInt(id));
  }

  /* Listar Entregas por Status */
  @Get('status/:status')
  async getDeliveriesByStatus(@Param('status') status: DeliveryStatus) {
    return this.deliveryService.getDeliveriesByStatus(status);
  }

  /* Listar Entregas por Motoboy */
  @Get('motoboy/:motoboyId')
  async getDeliveriesByMotoboy(@Param('motoboyId') motoboyId: string) {
    return this.deliveryService.getDeliveriesByMotoboy(parseInt(motoboyId));
  }

  /* Listar Entregas por Cliente */
  @Get('client/:clientId')
  async getDeliveriesByClient(@Param('clientId') clientId: string) {
    return this.deliveryService.getDeliveriesByClient(parseInt(clientId));
  }

  /* Listar Entregas por Central */
  @Get('supplier/:supplierId')
  async getDeliveriesBySupplier(@Param('supplierId') supplierId: string) {
    return this.deliveryService.getDeliveriesBySupplier(parseInt(supplierId));
  }
}
