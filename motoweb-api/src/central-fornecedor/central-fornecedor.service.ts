import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CentralFornecedorService {
  constructor(private readonly prisma: PrismaService) {}

  async createCentralFornecedor(
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

  async getAllCentrais() {
    return this.prisma.supplier.findMany();
  }

  async getCentralById(id: number) {
    const central = await this.prisma.supplier.findUnique({ where: { id } });
    if (!central) throw new NotFoundException('Central Fornecedora não encontrada');
    return central;
  }

  async updateCentral(id: number, data: any) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error('Os dados para atualização estão ausentes');
  }

  return this.prisma.supplier.update({
    where: { id },
    data,
  });
}

  async deleteCentral(id: number) {
    return this.prisma.supplier.delete({ where: { id } });
  }
}
