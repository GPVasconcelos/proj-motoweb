import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierEntity } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  // Mapeia o objeto do banco para a entidade da API
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

  // Cadastrar nova central fornecedora (supplier)
  async createSupplier(
    createSupplierDto: CreateSupplierDto,
  ): Promise<SupplierEntity> {
    const supplier = await this.prisma.supplier.create({
      data: { ...createSupplierDto },
    });
    return this.mapToSupplierEntity(supplier);
  }

  // Atualizar dados de uma central fornecedora
  async updateSupplier(
    supplierId: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<SupplierEntity> {
    const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    const updated = await this.prisma.supplier.update({
      where: { id: supplierId },
      data: { ...updateSupplierDto },
    });

    return this.mapToSupplierEntity(updated);
  }

  // Remover uma central fornecedora
  async deleteSupplier(supplierId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    return this.prisma.supplier.delete({ where: { id: supplierId } });
  }

  // Obter dados de uma central fornecedora por ID
  async getSupplierById(supplierId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    return supplier;
  }

  // Listar todas as centrais fornecedoras
  async getAllSuppliers(): Promise<SupplierEntity[]> {
    const suppliers = await this.prisma.supplier.findMany();
    return suppliers.map((s) => this.mapToSupplierEntity(s));
  }

  // Visualizar todas as entregas da central fornecedora
  async getDeliveryBySupplier(userId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { userId } });

    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return this.prisma.delivery.findMany({
      where: { supplierId: supplier.id },
      orderBy: { requestedAt: 'desc' },
    });
  }

  // Visualizar entregas com status pendente
  async getPendingDeliverys(userId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { userId } });

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

  // Listar motoboys disponíveis
  async getMotoboys(userId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { userId } });

    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return this.prisma.motoboy.findMany({
      where: { status: 'DISPONIVEL' },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  }

  // Atribuir motoboy a uma entrega
  async assignMotoboy(userId: number, deliveryId: number, motoboyId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { userId } });
    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    const motoboy = await this.prisma.motoboy.findUnique({ where: { id: motoboyId } });
    if (!motoboy || motoboy.status !== 'DISPONIVEL') {
      throw new BadRequestException('Motoboy não está disponível');
    }

    const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });
    if (!delivery || delivery.supplierId !== supplier.id) {
      throw new NotFoundException('Entrega não encontrada ou não pertence a esta central');
    }

    await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { motoboyId: motoboy.id },
    });

    return { message: 'Motoboy designado com sucesso' };
  }

  // Cancelar uma entrega
  async cancelDelivery(deliveryId: number) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status: DeliveryStatus.CANCELED },
    });
  }

  // Histórico completo de entregas da central
  async getDeliveryHistory(userId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { userId } });

    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return this.prisma.delivery.findMany({
      where: { supplierId: supplier.id },
      orderBy: { requestedAt: 'desc' },
    });
  }
}
