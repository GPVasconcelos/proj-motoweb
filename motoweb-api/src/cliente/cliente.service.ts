import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  // Cadastrar um Cliente
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

  // Listar Cliente
  async getClients() {
    return this.prisma.client.findMany();
  }

  // Obter Cliente por ID
  async getClientById(clientId: number) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  // Atualizar Cliente
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

  //Deletar Cliente
  async deleteClient(clientId: number) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return this.prisma.client.delete({ where: { id: clientId } });
  }

  //Criar Entrega
  async createDelivery(
    userId: number,
    data: { supplierId: number; pickup: string; destination: string; recipient: string; serviceType: string }
  ) {
      const client = await this.prisma.client.findUnique({
    where: { userId: userId },
  });
  if (!client) {
    throw new NotFoundException('Cliente não encontrado');
  }

  const supplier = await this.prisma.supplier.findUnique({
    where: { id: data.supplierId },
  });
  if (!supplier) {
    throw new NotFoundException('Fornecedor não encontrado');
  }
  
    return this.prisma.delivery.create({
      data: {
        clientId: client.id,
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

  //Listar Entregas do Cliente
  async getDeliverysByClient(userId: number) {
  const client = await this.prisma.client.findUnique({
    where: { userId },
  });

  if (!client) {
    throw new NotFoundException('Cliente não encontrado');
  }

  return this.prisma.delivery.findMany({
    where: { clientId: client.id },
    orderBy: { requestedAt: 'desc' },
  });
}
  //Cancelar Entrega
async cancelDelivery(userId: number | string, deliveryId: number | string) {
  const userIdNumber = Number(userId);
  const deliveryIdNumber = Number(deliveryId); 

    const client = await this.prisma.client.findUnique({
      where: { userId: userIdNumber },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

      const delivery = await this.prisma.delivery.findUnique({
    where: { id: deliveryIdNumber },
  });

    if (!delivery || delivery.clientId !== client.id) {
    throw new ForbiddenException('Entrega não encontrada ou acesso não autorizado');
  }

    return this.prisma.delivery.update({
      where: { id: deliveryIdNumber },
      data: { status: DeliveryStatus.CANCELED },
    });
  }
}
