import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CentralFornecedorService } from './central-fornecedor.service';

@Controller('central')
export class CentralFornecedorController {
  constructor(private readonly centralService: CentralFornecedorService) {}

  @Post()
  async createCentralFornecedor(
    @Body() data: { userId: number; fantasyName: string; cnpj: string; operation: string }
  ) {
    return this.centralService.createCentralFornecedor(data.userId, data);
  }

  @Get()
  async getAllCentrais() {
    return this.centralService.getAllCentrais();
  }

  @Get(':id')
  async getCentralById(@Param('id') id: string) {
    const centralId = parseInt(id);
    if (isNaN(centralId)) throw new Error('ID inválido');
    return this.centralService.getCentralById(centralId);
  }

  @Patch(':id')
  async updateCentral(
  @Param('id') id: string,
  @Body() data: any
) {
  const centralId = parseInt(id);
  if (isNaN(centralId)) throw new Error('ID inválido');

  console.log('Dados recebidos no Body:', data);

  if (!data || Object.keys(data).length === 0) {
    throw new Error('Os dados para atualização estão ausentes');
  }

  return this.centralService.updateCentral(centralId, data);
}

  @Delete(':id')
  async deleteCentral(@Param('id') id: string) {
    const centralId = parseInt(id);
    if (isNaN(centralId)) throw new Error('ID inválido');
    return this.centralService.deleteCentral(centralId);
  }
}
