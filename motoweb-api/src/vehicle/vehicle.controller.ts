import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async createVehicle(@Body() data: { model: string; color: string; type: string; renavam: string; year: number; plate: string }) {
    return this.vehicleService.createVehicle(data);
  }

  @Get()
  async getAllVehicles() {
    return this.vehicleService.getAllVehicles();
  }

  @Get(':id')
  async getVehicleById(@Param('id') id: string) {
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) throw new Error('Invalid vehicle ID');
    return this.vehicleService.getVehicleById(vehicleId);
  }

  @Patch(':id')
  async updateVehicle(@Param('id') id: string, @Body() data: any) {
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) throw new Error('Invalid vehicle ID');
    return this.vehicleService.updateVehicle(vehicleId, data);
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: string) {
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) throw new Error('Invalid vehicle ID');
    return this.vehicleService.deleteVehicle(vehicleId);
  }
}
