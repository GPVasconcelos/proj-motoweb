import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MotoboyService } from './motoboy.service';
import { DeliveryStatus } from '@prisma/client';

@Controller('motoboy')
export class MotoboyController {
  constructor(private readonly motoboyService: MotoboyService) {}

  /* Cadastrar um Motoboy */
  @Post()
  async createMotoboy(
    @Body() data: { userId: number; cpf: string; cnh: string; status: string; gender: string; emergencyContact: string }
  ) {
    return this.motoboyService.createMotoboy(data.userId, data);
  }

  /* Listar Motoboy */
  @Get()
  async getMotoboys() {
    return this.motoboyService.getMotoboys();
  }

  /* Obter Motoboy por ID */
  @Get(':id')
  async getMotoboyById(@Param('id') id: string) {
    return this.motoboyService.getMotoboyById(parseInt(id));
  }

  /* Atualizar Motoboy */
  @Patch(':id')
  async updateMotoboy(@Param('id') id: string, @Body() data: any) {
    return this.motoboyService.updateMotoboy(parseInt(id), data);
  }

  /* Remover Motoboy */
  @Delete(':id')
  async deleteMotoboy(@Param('id') id: string) {
    return this.motoboyService.deleteMotoboy(parseInt(id));
  }

  /* Registrar um Veículo */
  @Post(':id/vehicles')
  async createVehicle(
    @Param('id') id: string,
    @Body() data: { model: string; color: string; type: string; renavam: string; year: number; plate: string }
  ) {
    return this.motoboyService.createVehicle(parseInt(id), data);
  }

  /* Atualizar Veículo */
  @Patch(':id/vehicles/:vehicleId')
  async updateVehicle(
    @Param('id') id: string,
    @Param('vehicleId') vehicleId: string,
    @Body() data: any
  ) {
    return this.motoboyService.updateVehicle(parseInt(id), parseInt(vehicleId), data);
  }

  /* Remover Veículo */
  @Delete(':id/vehicles/:vehicleId')
  async deleteVehicle(@Param('id') id: string, @Param('vehicleId') vehicleId: string) {
    return this.motoboyService.deleteVehicle(parseInt(id), parseInt(vehicleId));
  }

  /* Listar Veículos */
  @Get(':id/vehicles')
  async getVehiclesByMotoboy(@Param('id') id: string) {
    return this.motoboyService.getVehiclesByMotoboy(parseInt(id));
  }

  /* Listar Entregas */
  @Get(':id/deliveries')
  async getDeliveriesByMotoboy(@Param('id') id: string) {
    return this.motoboyService.getDeliveriesByMotoboy(parseInt(id));
  }

  /* Atualizar Status da Entrega */
  @Patch(':id/deliveries/:deliveryId/status')
  async updateDeliveryStatus(
    @Param('id') id: string,
    @Param('deliveryId') deliveryId: string,
    @Body('status') status: DeliveryStatus
  ) {
    return this.motoboyService.updateDeliveryStatus(parseInt(id), parseInt(deliveryId), status);
  }
}
