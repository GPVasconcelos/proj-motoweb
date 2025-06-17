import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientService } from '../cliente/cliente.service';
import { CreateClientDto } from '../cliente/dto/create-cliente.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Cadastrar um novo cliente
  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  // Listar todos os clientes
  @Get()
  getClients() {
    return this.clientService.getClients();
  }

  // Buscar cliente pelo ID
  @Get(':id')
  getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(parseInt(id));
  }

  // Atualizar cliente existente
  @Patch(':id')
  updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateClient(parseInt(id), updateClientDto);
  }

  // Remover cliente (remoção física)
  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(parseInt(id));
  }

  // Criar entrega a partir de um cliente
  @Post(':userId/delivery')
  createDelivery(
    @Param('userId') userId: string,
    @Body()
    data: {
      supplierId: number;
      pickup: string;
      destination: string;
      recipient: string;
      serviceType: string;
    },
  ) {
    return this.clientService.createDelivery(parseInt(userId), data);
  }

  // Listar todas as entregas de um cliente
  @Get(':userId/delivery')
  getDeliverysByClient(@Param('userId') userId: string) {
    return this.clientService.getDeliverysByClient(parseInt(userId));
  }

  // Cancelar uma entrega do cliente
  @Patch(':userId/delivery/:deliveryId/cancel')
  cancelDelivery(
    @Param('userId') userId: string,
    @Param('deliveryId') deliveryId: string,
  ) {
    return this.clientService.cancelDelivery(userId, deliveryId);
  }
}
