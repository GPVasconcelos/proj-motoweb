import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';
import { CreateClientDto } from './dto/create-cliente.dto';
import { ClientEntity } from './entities/client.entity';
import { Client } from '@prisma/client';
import { UpdateClientDto } from './dto/update-client.dto';


@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {};

  private mapToClientEntity(client: Client): ClientEntity {
    return {
      id: client.id,
      userId: client.userId,
      cnpj: client.cnpj,
      stateReg: client.stateReg,
      fantasyName: client.fantasyName,
      sector: client.sector,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  /*Cadastrar um Cliente*/
  async createClient(
    createClienteDto: CreateClientDto
  ): Promise<ClientEntity> {
    const client = await this.prisma.client.create({
      data: {
        userId: createClienteDto.userId,
        cnpj: createClienteDto.cnpj,
        stateReg: createClienteDto.stateReg,
        fantasyName: createClienteDto.fantasyName,
        sector: createClienteDto.sector,
      },
    });

    return this.mapToClientEntity(client);
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
  async updateClient(clientId: number, updateClientDto: UpdateClientDto): Promise<ClientEntity> {
    const clientExists = await this.prisma.client.findUnique({ where: { id: clientId } });

    if (!clientExists) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const client = await this.prisma.client.update({
      where: { id: clientId },
      data: {
        cnpj: updateClientDto.cnpj,
        stateReg: updateClientDto.stateReg,
        fantasyName: updateClientDto.fantasyName,
        sector: updateClientDto.sector,
      },
    });
    return this.mapToClientEntity(client);
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
