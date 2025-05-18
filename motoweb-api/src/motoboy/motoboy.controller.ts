import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MotoboyService } from './motoboy.service';

@Controller('motoboys')
export class MotoboyController {
  constructor(private readonly motoboyService: MotoboyService) {}

  @Post()
async createMotoboy(
  @Body() data: { userId: number; cpf: string; cnh: string; status: string; gender: string; emergencyContact: string }
) {
  const { userId, ...motoboyData } = data;
  return this.motoboyService.createMotoboy(userId, motoboyData);
}

  @Get()
  async getAllMotoboys() {
    return this.motoboyService.getAllMotoboys();
  }

  @Get(':id')
  async getMotoboyById(@Param('id') id: string) {
    return this.motoboyService.getMotoboyById(parseInt(id));
  }

  @Patch(':id')
  async updateMotoboy(@Param('id') id: string, @Body() data: any) {
    return this.motoboyService.updateMotoboy(parseInt(id), data);
  }

  @Delete(':id')
  async deleteMotoboy(@Param('id') id: string) {
    return this.motoboyService.deleteMotoboy(parseInt(id));
  }

  @Patch(':id/vehicle')
  async assignVehicle(@Param('id') id: string, @Body('vehicleId') vehicleId: number) {
    return this.motoboyService.assignVehicle(parseInt(id), vehicleId);
  }
}
