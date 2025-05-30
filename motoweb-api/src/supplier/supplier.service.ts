import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierEntity } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  // Mapear para SupplierEntity
  private mapToSupplierEntity(supplier: any): SupplierEntity {
    return {
      id: supplier.id,
      userId: supplier.userId,
      fantasyName: supplier.fantasyName,
      cnpj: supplier.cnpj,
      operation: supplier.operation,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    };
  }

  //Cadastrar uma Central Fornecedora
  async createSupplier(
    createSupplierDto: CreateSupplierDto,
  ): Promise<SupplierEntity> {
    const supplier = await this.prisma.supplier.create({
      data: {
        userId: createSupplierDto.userId,
        fantasyName: createSupplierDto.fantasyName,
        cnpj: createSupplierDto.cnpj,
        operation: createSupplierDto.operation,
      },
    });

    return this.mapToSupplierEntity(supplier);
  }

  //Atualizar Central Fornecedora
  async updateSupplier(
    supplierId: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<SupplierEntity> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    const updated = await this.prisma.supplier.update({
      where: { id: supplierId },
      data: {
        userId: updateSupplierDto.userId,
        fantasyName: updateSupplierDto.fantasyName,
        cnpj: updateSupplierDto.cnpj,
        operation: updateSupplierDto.operation,
      },
    });

    return this.mapToSupplierEntity(updated);
  }

  //Remover Central Fornecedora
  async deleteSupplier(supplierId: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    return this.prisma.supplier.delete({ where: { id: supplierId } });
  }

  // Obter Central Fornecedora por ID
  async getSupplierById(supplierId: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    return supplier;
  }

  // Listar Centrais Fornecedoras
  async getAllSuppliers(): Promise<SupplierEntity[]> {
    const suppliers = await this.prisma.supplier.findMany();
    return suppliers.map((s) => this.mapToSupplierEntity(s));
  }

  // Visualizar Entregas
  async getDeliveryBySupplier(userId: number) {
  const supplier = await this.prisma.supplier.findUnique({
    where: { userId }
  });

  if (!supplier) {
    throw new NotFoundException('Fornecedor não encontrado');
  }

  return this.prisma.delivery.findMany({
    where: { supplierId: supplier.id },
    orderBy: { requestedAt: 'desc' },
  });
}
 
  // Visualizar Entregas Pendentes
  async getPendingDeliverys(UserId: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { userId: UserId }
    });

    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return this.prisma.delivery.findMany({
      where: {
        supplierId: supplier.id,
        status: DeliveryStatus.PENDING,
      },
      orderBy: { requestedAt: 'desc' },
    });
  }

// Vizualizar motoboy disponivel
async getMotoboysByUserId(userId: number) {
  const supplier = await this.prisma.supplier.findUnique({
    where: { userId },
  });

  if (!supplier) {
    throw new NotFoundException('Fornecedor não encontrado');
  }

  return this.prisma.motoboy.findMany({
    where: {
      status: 'DISPONIVEL',
    },
    select: {
      id: true,
      name: true,
      status: true
    }
  });
}

  // Atribuir Motoboy a uma Entrega
  async assignMotoboy(userId: number, deliveryId: number, motoboyId: number) {
  const supplier = await this.prisma.supplier.findUnique({
    where: { userId },
  });

  if (!supplier) {
    throw new NotFoundException('Central fornecedora não encontrada');
  }

  const motoboy = await this.prisma.motoboy.findUnique({
    where: { id: motoboyId },
  });

  if (!motoboy || motoboy.status !== 'DISPONIVEL') {
    throw new BadRequestException('Motoboy indisponível para designação');
  }

  // Atualiza o status do motoboy se necessário
  await this.prisma.motoboy.update({
    where: { id: motoboy.id },
    data: { status: 'OCUPADO' },
  });

  return { message: 'Motoboy designado com sucesso' };
}

  // Cancelar Entrega
  async cancelDelivery(deliveryId: number) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: deliveryId },
    });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status: DeliveryStatus.CANCELED },
    });
  }

  // Histórico de Entregas
  async getDeliveryHistory(UserId: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { userId: UserId },
    });
    
    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return this.prisma.delivery.findMany({
      where: { supplierId: supplier.id },
      orderBy: { requestedAt: 'desc' },
    });
  }
}
