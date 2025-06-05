import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  // Mapeia o motoboy do banco para a entidade da API
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

  // Mapeia o veículo do banco para a entidade da API
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

  // Cadastrar um novo motoboy
  async createMotoboy(
    createMotoboyDto: CreateMotoboyDto,
  ): Promise<MotoboyEntity> {
    const motoboy = await this.prisma.motoboy.create({
      data: { ...createMotoboyDto },
    });
    return this.mapToMotoboyEntity(motoboy);
  }

  // Listar todos os motoboys
  async getMotoboys(): Promise<MotoboyEntity[]> {
    const motoboys = await this.prisma.motoboy.findMany();
    return motoboys.map(this.mapToMotoboyEntity);
  }

  // Obter motoboy por ID
  async getMotoboyById(id: number): Promise<MotoboyEntity> {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return this.mapToMotoboyEntity(motoboy);
  }

  // Atualizar dados de um motoboy
  async updateMotoboy(
    id: number,
    updateMotoboyDto: UpdateMotoboyDto,
  ): Promise<MotoboyEntity> {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    const updated = await this.prisma.motoboy.update({
      where: { id },
      data: { ...updateMotoboyDto },
    });

    return this.mapToMotoboyEntity(updated);
  }

  // Remover um motoboy
  async deleteMotoboy(id: number) {
    const motoboy = await this.prisma.motoboy.findUnique({ where: { id } });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return this.prisma.motoboy.delete({ where: { id } });
  }

  // Registrar um novo veículo para o motoboy
  async createVehicle(
    motoboyId: number,
    data: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.prisma.vehicle.create({
      data: { ...data, motoboyId },
    });
    return this.mapToVehicleEntity(vehicle);
  }

  // Atualizar um veículo de um motoboy
  async updateVehicle(
    motoboyId: number,
    vehicleId: number,
    data: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      select: { motoboyId: true },
    });

    if (!vehicle || vehicle.motoboyId !== motoboyId) {
      throw new NotFoundException(
        'Veículo não encontrado ou não pertence a este motoboy',
      );
    }

    const updated = await this.prisma.vehicle.update({
      where: { id: vehicleId },
      data,
    });

    return this.mapToVehicleEntity(updated);
  }

  // Remover um veículo do motoboy
  async deleteVehicle(motoboyId: number, vehicleId: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      select: { motoboyId: true },
    });

    if (!vehicle || vehicle.motoboyId !== motoboyId) {
      throw new NotFoundException(
        'Veículo não encontrado ou não pertence a este motoboy',
      );
    }

    return this.prisma.vehicle.delete({ where: { id: vehicleId } });
  }

  // Listar todos os veículos cadastrados por um motoboy
  async getVehiclesByMotoboy(motoboyId: number): Promise<VehicleEntity[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: { motoboyId },
    });

    return vehicles.map((v) => this.mapToVehicleEntity(v));
  }

  // Listar entregas atribuídas ao motoboy
  async getDeliveriesByMotoboy(motoboyId: number) {
    return this.prisma.delivery.findMany({
      where: { motoboyId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  // Atualizar status da entrega com base na ação do motoboy
  async updateDeliveryStatus(
    motoboyId: number,
    deliveryId: number,
    action: 'ACEITAR' | 'RECUSAR' | 'COMPLETED',
  ) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: deliveryId },
    });

    if (!delivery || delivery.motoboyId !== motoboyId) {
      throw new NotFoundException('Entrega não atribuída a este motoboy.');
    }

    // Recusar a entrega
    if (action === 'RECUSAR') {
      await this.prisma.delivery.update({
        where: { id: deliveryId },
        data: {
          status: DeliveryStatus.PENDING,
          motoboyId: null,
        },
      });

      await this.prisma.motoboy.update({
        where: { id: motoboyId },
        data: { status: 'DISPONIVEL' },
      });

      return { message: 'Entrega recusada. Motoboy liberado.' };
    }

    // Aceitar a entrega
    if (action === 'ACEITAR') {
      await this.prisma.delivery.update({
        where: { id: deliveryId },
        data: {
          status: DeliveryStatus.IN_PROGRESS,
          motoboyId,
        },
      });

      await this.prisma.motoboy.update({
        where: { id: motoboyId },
        data: { status: 'OCUPADO' },
      });

      return { message: 'Entrega aceita com sucesso.' };
    }

    // Finalizar entrega
    if (action === 'COMPLETED') {
      await this.prisma.delivery.update({
        where: { id: deliveryId },
        data: {
          status: DeliveryStatus.COMPLETED,
        },
      });

      return { message: 'Entrega finalizada com sucesso.' };
    }

    throw new BadRequestException('Ação inválida');
  }

  // Buscar motoboy com base no ID do usuário
  async findByUserId(userId: number): Promise<MotoboyEntity> {
    const motoboy = await this.prisma.motoboy.findUnique({
      where: { userId: Number(userId) },
    });

    if (!motoboy) {
      throw new NotFoundException('Motoboy não encontrado');
    }

    return this.mapToMotoboyEntity(motoboy);
  }
}
