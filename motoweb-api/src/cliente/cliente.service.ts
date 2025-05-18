import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  /*Cadastrar um Cliente*/
  async createClient(
    userId: number,
    data: { cnpj: string; stateReg?: string; fantasyName: string; sector: string }
  ) {
    return this.prisma.client.create({
      data: {
        userId,
        cnpj: data.cnpj,
        stateReg: data.stateReg,
        fantasyName: data.fantasyName,
        sector: data.sector,
      },
    });
  }

  /* Listar Cliente */
  async getClients() {
    return this.prisma.client.findMany();
  }

  /* Obter Cliente por ID */
  async getClientById(clientId: number) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  /* Atualizar Cliente */
  async updateClient(clientId: number, data: any) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return this.prisma.client.update({
      where: { id: clientId },
      data,
    });
  }

  /* Remover Cliente */
  async deleteClient(clientId: number) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return this.prisma.client.delete({ where: { id: clientId } });
  }

  /* Criar Entrega */
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

  /* Listar Entregas do Cliente */
  async getDeliveriesByClient(clientId: number) {
    return this.prisma.delivery.findMany({
      where: { clientId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  /* Consultar Entrega Específica */
  async getDeliveryById(clientId: number, deliveryId: number) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: deliveryId },
    });

    if (!delivery || delivery.clientId !== clientId) {
      throw new NotFoundException('Entrega não encontrada ou não pertence a este cliente');
    }

    return delivery;
  }
}
