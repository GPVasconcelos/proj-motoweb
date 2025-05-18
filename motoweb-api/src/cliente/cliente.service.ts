import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async createCliente(userId: number, data: any) {
    return this.prisma.client.create({
      data: { ...data, userId }
    });
  }

  async getAllClientes() {
    return this.prisma.client.findMany();
  }

  async getClienteById(id: number) {
    const cliente = await this.prisma.client.findUnique({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente not found');
    return cliente;
  }

  async updateCliente(id: number, data: any) {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async deleteCliente(id: number) {
    return this.prisma.client.delete({ where: { id } });
  }
}
