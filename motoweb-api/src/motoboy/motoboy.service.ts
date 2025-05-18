import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MotoboyService {
  constructor(private readonly prisma: PrismaService) {}

  async createMotoboy(
  userId: number,
  data: { cpf: string; cnh: string; status: string; gender: string; emergencyContact: string }
) {
  return this.prisma.motoboy.create({
    data: { ...data, userId },
  });
}

  async getAllMotoboys() {
    return this.prisma.motoboy.findMany({
      include: { vehicle: true }
    });
  }

  async getMotoboyById(id: number) {
    const motoboy = await this.prisma.motoboy.findUnique({
      where: { id },
      include: { vehicle: true }
    });
    if (!motoboy) throw new NotFoundException('Motoboy not found');
    return motoboy;
  }

  async updateMotoboy(id: number, data: any) {
    return this.prisma.motoboy.update({
      where: { id },
      data,
    });
  }

  async deleteMotoboy(id: number) {
    return this.prisma.motoboy.delete({ where: { id } });
  }

  async assignVehicle(motoboyId: number, vehicleId: number) {
    const motoboy = await this.prisma.motoboy.update({
      where: { id: motoboyId },
      data: { vehicleId }
    });
    return motoboy;
  }
}
