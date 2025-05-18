import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehicle(data: { model: string; color: string; type: string; renavam: string; year: number; plate: string }) {
    return this.prisma.vehicle.create({ data });
  }

  async getAllVehicles() {
    return this.prisma.vehicle.findMany();
  }

  async getVehicleById(id: number) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async updateVehicle(id: number, data: any) {
    return this.prisma.vehicle.update({ where: { id }, data });
  }

  async deleteVehicle(id: number) {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
