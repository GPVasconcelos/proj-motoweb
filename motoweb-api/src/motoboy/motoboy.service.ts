import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';
import { MotoboyEntity } from './entities/motoboy.entity';
import { VehicleEntity } from './entities/vehicle.entity';
import { CreateMotoboyDto } from './dto/create-motoboy.dto';
import { UpdateMotoboyDto } from './dto/update-motoboy.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class MotoboyService {
  constructor(private readonly prisma: PrismaService) {}

  // Mapear para MotoboyEntity
   private mapToMotoboyEntity(motoboy: any): MotoboyEntity {
    return {
      id: motoboy.id,
      userId: motoboy.userId,
      name: motoboy.name,
      cpf: motoboy.cpf,
      cnh: motoboy.cnh,
      gender: motoboy.gender,
      emergencyContact: motoboy.emergencyContact,
      status: motoboy.status,
      createdAt: motoboy.createdAt,
      updatedAt: motoboy.updatedAt,
    };
  }

  // Mapear para VehicleEntity
   private mapToVehicleEntity(vehicle: any): VehicleEntity {
    return {
      id: vehicle.id,
      model: vehicle.model,
      color: vehicle.color,
      type: vehicle.type,
      renavam: vehicle.renavam,
      year: vehicle.year,
      plate: vehicle.plate,
      motoboyId: vehicle.motoboyId,
    };
  }

  //Cadastrar um Motoboy
   async createMotoboy(createMotoboyDto: CreateMotoboyDto): Promise<MotoboyEntity> {
    const motoboy = await this.prisma.motoboy.create({
      data: {
        userId: createMotoboyDto.userId,
        name: createMotoboyDto.name,
        cpf: createMotoboyDto.cpf,
        cnh: createMotoboyDto.cnh,
        status: createMotoboyDto.status,
        gender: createMotoboyDto.gender,
        emergencyContact: createMotoboyDto.emergencyContact,
      },
    });
    return this.mapToMotoboyEntity(motoboy);
  }

  //Listar Motoboy
  async getMotoboys(): Promise<MotoboyEntity[]> {
    const motoboys = await this.prisma.motoboy.findMany();
    return motoboys.map(this.mapToMotoboyEntity);
  }

  //Obter Motoboy por ID
  async getMotoboyById(id: number): Promise<MotoboyEntity> {
    const motoboy = await this.prisma.motoboy.findUnique({ 
      where: { id } 
    });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return this.mapToMotoboyEntity(motoboy);
  }

  //Atualizar Motoboy
  async updateMotoboy(id: number, UpdateMotoboyDto: UpdateMotoboyDto): Promise<MotoboyEntity> {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    const updatedMotoboy = await this.prisma.motoboy.update({
      where: { id },
      data: {
        name: UpdateMotoboyDto.name,
        cpf: UpdateMotoboyDto.cpf,
        cnh: UpdateMotoboyDto.cnh,
        status: UpdateMotoboyDto.status,
        gender: UpdateMotoboyDto.gender,
        emergencyContact: UpdateMotoboyDto.emergencyContact,
      }
    });

    return this.mapToMotoboyEntity(updatedMotoboy);
  }

  //Remover Motoboy
  async deleteMotoboy(id: number) {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return this.prisma.motoboy.delete({ where: { id } });
  }

  //Registrar um Veículo para o Motoboy
  async createVehicle(motoboyId: number, data: CreateVehicleDto): Promise<VehicleEntity> {
    const vehicle = await this.prisma.vehicle.create({
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
    return this.mapToVehicleEntity(vehicle);
  }

  //Atualizar um Veículo do Motoboy
  async updateVehicle(motoboyId: number, vehicleId: number, data: UpdateVehicleDto): Promise<VehicleEntity> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      select: { motoboyId: true },
    });

    if (!vehicle || vehicle.motoboyId !== motoboyId) {
      throw new NotFoundException('Veículo não encontrado ou não pertence a este motoboy');
    }

    const updated = await this.prisma.vehicle.update({
      where: { id: vehicleId },
      data,
    });

    return this.mapToVehicleEntity(updated);
  }

  //Remover um Veículo do Motoboy
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

  // Listar Veículos Cadastrados pelo Motoboy
  async getVehiclesByMotoboy(motoboyId: number): Promise<VehicleEntity[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: { motoboyId },
    });

    return vehicles.map((v) => this.mapToVehicleEntity(v));
  }

  // Listar Entregas Atribuídas ao Motoboy
  async getDeliveriesByMotoboy(motoboyId: number) {
    return this.prisma.delivery.findMany({
      where: { motoboyId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  // Atualizar Status da Entrega (IN_PROGRESS, COMPLETED, CANCELED)
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
  async findByUserId(userId: number) {
  const motoboy = await this.prisma.motoboy.findUnique({
    where: { userId: Number(userId) },
  });

  if (!motoboy) {
    throw new NotFoundException('Motoboy não encontrado');
  }

  return motoboy;
}

}
