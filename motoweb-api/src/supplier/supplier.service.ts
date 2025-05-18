import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  /* Cadastrar uma Central Fornecedora */
  async createSupplier(
    userId: number,
    data: { fantasyName: string; cnpj: string; operation: string }
  ) {
    return this.prisma.supplier.create({
      data: {
        userId,
        fantasyName: data.fantasyName,
        cnpj: data.cnpj,
        operation: data.operation,
      },
    });
  }

  /* Atualizar Central Fornecedora */
  async updateSupplier(supplierId: number, data: any) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    return this.prisma.supplier.update({
      where: { id: supplierId },
      data,
    });
  }

  /* Remover Central Fornecedora */
  async deleteSupplier(supplierId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    return this.prisma.supplier.delete({ where: { id: supplierId } });
  }

  /* Obter Central Fornecedora por ID */
  async getSupplierById(supplierId: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });

    if (!supplier) {
      throw new NotFoundException('Central Fornecedora não encontrada');
    }

    return supplier;
  }

  /* Listar Centrais Fornecedoras */
  async getAllSuppliers() {
    return this.prisma.supplier.findMany();
  }

 
  /* Visualizar Entregas Pendentes */
  async getPendingDeliveries(supplierId: number) {
    return this.prisma.delivery.findMany({
      where: {
        supplierId,
        status: DeliveryStatus.PENDING,
      },
    });
  }

  /*Atribuir Motoboy a uma Entrega*/
  async assignMotoboy(deliveryId: number, motoboyId: number) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return this.prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        motoboyId,
        status: DeliveryStatus.IN_PROGRESS,
      },
    });
  }

  /*Cancelar Entrega*/
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

  /*Relatório de Entregas por Status*/
  async getDeliveriesByStatus(supplierId: number, status: DeliveryStatus) {
    return this.prisma.delivery.findMany({
      where: {
        supplierId,
        status,
      },
    });
  }

  /*Histórico de Entregas*/
  async getDeliveryHistory(supplierId: number) {
    return this.prisma.delivery.findMany({
      where: { supplierId },
      orderBy: { requestedAt: 'desc' },
    });
  }
}
