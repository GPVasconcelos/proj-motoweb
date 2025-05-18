import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  /*criar uma Entrega (Solicitada pelo Cliente)*/
  async createDelivery(
    clientId: number,
    data: { supplierId: number; pickup: string; destination: string; recipient: string; serviceType: string }
  ) {
    return this.prisma.delivery.create({
      data: {
        clientId,
        supplierId: data.supplierId,
        pickup: data.pickup,
        destination: data.destination,
        recipient: data.recipient,
        serviceType: data.serviceType,
        status: DeliveryStatus.PENDING,
        requestedAt: new Date(),
      },
    });
  }

  /* Atualizar o Status da Entrega */
  async updateDeliveryStatus(deliveryId: number, status: DeliveryStatus) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status },
    });
  }

  /* Consultar uma Entrega Específica */
  async getDeliveryById(deliveryId: number) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return delivery;
  }

  /* Listar Entregas por Status */
  async getDeliveriesByStatus(status: DeliveryStatus) {
    return this.prisma.delivery.findMany({
      where: { status },
      orderBy: { requestedAt: 'desc' },
    });
  }

  /* Listar Entregas por Motoboy */
  async getDeliveriesByMotoboy(motoboyId: number) {
    return this.prisma.delivery.findMany({
      where: { motoboyId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  /* Listar Entregas por Cliente */
  async getDeliveriesByClient(clientId: number) {
    return this.prisma.delivery.findMany({
      where: { clientId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  /* Listar Entregas por Central */
  async getDeliveriesBySupplier(supplierId: number) {
    return this.prisma.delivery.findMany({
      where: { supplierId },
      orderBy: { requestedAt: 'desc' },
    });
  }
}
