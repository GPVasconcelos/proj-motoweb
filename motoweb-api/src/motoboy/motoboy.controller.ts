import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MotoboyService } from './motoboy.service';
import { CreateMotoboyDto } from './dto/create-motoboy.dto';
import { UpdateMotoboyDto } from './dto/update-motoboy.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('motoboy')
export class MotoboyController {
  constructor(private readonly motoboyService: MotoboyService) {}

  // Cadastrar um novo motoboy
  @Post()
  createMotoboy(@Body() createMotoboyDto: CreateMotoboyDto) {
    return this.motoboyService.createMotoboy(createMotoboyDto);
  }

  // Listar todos os motoboys
  @Get()
  getMotoboys() {
    return this.motoboyService.getMotoboys();
  }

  // Obter motoboy pelo ID
  @Get(':id')
  getMotoboyById(@Param('id') id: string) {
    return this.motoboyService.getMotoboyById(parseInt(id));
  }

  // Atualizar dados do motoboy
  @Patch(':id')
  updateMotoboy(
    @Param('id') id: string,
    @Body() updateMotoboyDto: UpdateMotoboyDto,
  ) {
    return this.motoboyService.updateMotoboy(parseInt(id), updateMotoboyDto);
  }

  // Remover motoboy
  @Delete(':id')
  deleteMotoboy(@Param('id') id: string) {
    return this.motoboyService.deleteMotoboy(parseInt(id));
  }

  // Registrar um novo veículo para o motoboy
  @Post(':id/vehicles')
  createVehicle(
    @Param('id') id: string,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return this.motoboyService.createVehicle(parseInt(id), createVehicleDto);
  }

  // Listar todos os veículos de um motoboy
  @Get(':id/vehicles')
  getVehiclesByMotoboy(@Param('id') id: string) {
    return this.motoboyService.getVehiclesByMotoboy(parseInt(id));
  }

  // Atualizar um veículo do motoboy
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

  // Remover um veículo do motoboy
  @Delete(':id/vehicles/:vehicleId')
  deleteVehicle(
    @Param('id') id: string,
    @Param('vehicleId') vehicleId: string,
  ) {
    return this.motoboyService.deleteVehicle(parseInt(id), parseInt(vehicleId));
  }

  // Listar entregas atribuídas ao motoboy
  @Get(':id/delivery')
  getDeliveriesByMotoboy(@Param('id') id: string) {
    return this.motoboyService.getDeliveriesByMotoboy(parseInt(id));
  }

  // Atualizar status da entrega (aceitar, recusar, concluir)
  @Patch(':id/delivery/:deliveryId/status')
  updateDeliveryStatus(
    @Param('id') id: string,
    @Param('deliveryId') deliveryId: string,
    @Body('action') action: 'ACEITAR' | 'RECUSAR' | 'COMPLETED',
  ) {
    return this.motoboyService.updateDeliveryStatus(
      parseInt(id),
      parseInt(deliveryId),
      action,
    );
  }

  // Buscar motoboy a partir do ID do usuário (usuário logado)
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.motoboyService.findByUserId(parseInt(userId));
  }
}
