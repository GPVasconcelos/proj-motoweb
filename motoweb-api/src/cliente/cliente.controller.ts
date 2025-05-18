import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientService } from '../cliente/cliente.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /*Cadastrar um Cliente*/
  @Post()
  async createClient(
    @Body() data: { userId: number; cnpj: string; stateReg?: string; fantasyName: string; sector: string }
  ) {
    return this.clientService.createClient(data.userId, data);
  }

  /* Listar Clientes */
  @Get()
  async getClients() {
    return this.clientService.getClients();
  }

  /* Obter Cliente por ID */
  @Get(':id')
  async getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(parseInt(id));
  }

  /* Atualizar Cliente */
  @Patch(':id')
  async updateClient(@Param('id') id: string, @Body() data: any) {
    return this.clientService.updateClient(parseInt(id), data);
  }

  /* Remover Cliente */
  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(parseInt(id));
  }

  /* Criar Entrega */
  @Post(':id/deliveries')
  async createDelivery(
    @Param('id') id: string,
    @Body() data: { supplierId: number; pickup: string; destination: string; recipient: string; serviceType: string }
  ) {
    return this.clientService.createDelivery(parseInt(id), data);
  }

  /* Listar Entregas do Cliente */
  @Get(':id/deliveries')
  async getDeliveriesByClient(@Param('id') id: string) {
    return this.clientService.getDeliveriesByClient(parseInt(id));
  }

  /* Consultar Entrega Específica */
  @Get(':id/deliveries/:deliveryId')
  async getDeliveryById(@Param('id') id: string, @Param('deliveryId') deliveryId: string) {
    return this.clientService.getDeliveryById(parseInt(id), parseInt(deliveryId));
  }
}
