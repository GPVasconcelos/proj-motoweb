import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class MotoboyService {
  constructor(private readonly prisma: PrismaService) {}

  /*Cadastrar um Motoboy*/
  async createMotoboy(
    userId: number,
    data: { cpf: string; cnh: string; status: string; gender: string; emergencyContact: string }
  ) {
    return this.prisma.motoboy.create({
      data: {
        userId,
        cpf: data.cpf,
        cnh: data.cnh,
        status: data.status,
        gender: data.gender,
        emergencyContact: data.emergencyContact,
      },
    });
  }

  /*Listar Motoboy*/
  async getMotoboys() {
    return this.prisma.motoboy.findMany();
  }

  /*Obter Motoboy por ID*/
  async getMotoboyById(id: number) {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return motoboy;
  }

  /*Atualizar Motoboy*/
  async updateMotoboy(id: number, data: any) {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return this.prisma.motoboy.update({
      where: { id },
      data,
    });
  }

  /*Remover Motoboy*/
  async deleteMotoboy(id: number) {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return this.prisma.motoboy.delete({ where: { id } });
  }

  /*Registrar um Veículo para o Motoboy*/
  async createVehicle(
  motoboyId: number,
  data: { model: string; color: string; type: string; renavam: string; year: number; plate: string }
) {
  return this.prisma.vehicle.create({
    data: {
      model: data.model,
      color: data.color,
      type: data.type,
      renavam: data.renavam,
      year: data.year,
      plate: data.plate,
      motoboyId,
    },
  });
}

  /*Atualizar um Veículo do Motoboy*/
  async updateVehicle(motoboyId: number, vehicleId: number, data: any) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      select: { motoboyId: true },
    });

    if (!vehicle || vehicle.motoboyId !== motoboyId) {
      throw new NotFoundException('Veículo não encontrado ou não pertence a este motoboy');
    }

    return this.prisma.vehicle.update({
      where: { id: vehicleId },
      data,
    });
  }

  /*Remover um Veículo do Motoboy*/
  async deleteVehicle(motoboyId: number, vehicleId: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      select: { motoboyId: true },
    });

    if (!vehicle || vehicle.motoboyId !== motoboyId) {
      throw new NotFoundException('Veículo não encontrado ou não pertence a este motoboy');
    }

    return this.prisma.vehicle.delete({ where: { id: vehicleId } });
  }

  /* Listar Veículos Cadastrados pelo Motoboy */
  async getVehiclesByMotoboy(motoboyId: number) {
    return this.prisma.vehicle.findMany({
      where: { motoboyId },
    });
  }

  /*Listar Entregas Atribuídas ao Motoboy*/
  async getDeliveriesByMotoboy(motoboyId: number) {
    return this.prisma.delivery.findMany({
      where: { motoboyId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  /*Atualizar Status da Entrega (IN_PROGRESS, COMPLETED, CANCELED)*/
  async updateDeliveryStatus(motoboyId: number, deliveryId: number, status: DeliveryStatus) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });

    if (!delivery || delivery.motoboyId !== motoboyId) {
      throw new NotFoundException('Entrega não encontrada ou não atribuída a este motoboy');
    }

    return this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status },
    });
  }
}
