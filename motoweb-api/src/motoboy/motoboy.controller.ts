import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MotoboyService } from './motoboy.service';
import { CreateMotoboyDto } from './dto/create-motoboy.dto';
import { UpdateMotoboyDto } from './dto/update-motoboy.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { DeliveryStatus } from '@prisma/client';

@Controller('motoboy')
export class MotoboyController {
  constructor(private readonly motoboyService: MotoboyService) {}

  // Cadastrar um Motoboy
  @Post()
  createMotoboy(@Body() createMotoboyDto: CreateMotoboyDto) {
    return this.motoboyService.createMotoboy(createMotoboyDto);
  }

  // Listar Motoboys
  @Get()
  getMotoboys() {
    return this.motoboyService.getMotoboys();
  }

  // Obter Motoboy por ID
  @Get(':id')
  getMotoboyById(@Param('id') id: string) {
    return this.motoboyService.getMotoboyById(parseInt(id));
  }

  // Atualizar Motoboy
  @Patch(':id')
  updateMotoboy(@Param('id') id: string, @Body() updateMotoboyDto: UpdateMotoboyDto) {
    return this.motoboyService.updateMotoboy(parseInt(id), updateMotoboyDto);
  }

  // Remover Motoboy
  @Delete(':id')
  deleteMotoboy(@Param('id') id: string) {
    return this.motoboyService.deleteMotoboy(parseInt(id));
  }

  // Registrar Veículo
  @Post(':id/vehicles')
  createVehicle(@Param('id') id: string, @Body() createVehicleDto: CreateVehicleDto) {
    return this.motoboyService.createVehicle(parseInt(id), createVehicleDto);
  }

  // Listar Veículos do Motoboy
  @Get(':id/vehicles')
  getVehiclesByMotoboy(@Param('id') id: string) {
    return this.motoboyService.getVehiclesByMotoboy(parseInt(id));
  }

  /* Atualizar Veículo */
  @Patch(':id/vehicles/:vehicleId')
  updateVehicle(
    @Param('id') id: string,
    @Param('vehicleId') vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.motoboyService.updateVehicle(
      parseInt(id),
      parseInt(vehicleId),
      updateVehicleDto,
    );
  }

  /* Remover Veículo */
  @Delete(':id/vehicles/:vehicleId')
  deleteVehicle(@Param('id') id: string, @Param('vehicleId') vehicleId: string) {
    return this.motoboyService.deleteVehicle(parseInt(id), parseInt(vehicleId));
  }

  /* Listar Entregas do Motoboy */
  @Get(':id/delivery')
  getDeliveriesByMotoboy(@Param('id') id: string) {
    return this.motoboyService.getDeliveriesByMotoboy(parseInt(id));
  }

  /* Atualizar Status da Entrega */
  @Patch(':id/delivery/:deliveryId/status')
  updateDeliveryStatus(
    @Param('id') id: string,
    @Param('deliveryId') deliveryId: string,
    @Body('status') status: DeliveryStatus,
  ) {
    return this.motoboyService.updateDeliveryStatus(
      parseInt(id),
      parseInt(deliveryId),
      status,
    );
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: number) {
  return this.motoboyService.findByUserId(userId);
}

}