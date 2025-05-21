import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientService } from '../cliente/cliente.service';
import { CreateClientDto } from '../cliente/dto/create-cliente.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  //Cadastrar um Cliente
  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  //Listar Clientes
  @Get()
  getClients() {
    return this.clientService.getClients();
  }

  //Obter Cliente por ID
  @Get(':id')
  getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(parseInt(id));
  }

  //Atualizar Cliente
  @Patch(':id')
  updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.updateClient(parseInt(id), updateClientDto);
  }

  //Remover Cliente
  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(parseInt(id));
  }

  //Criar Entrega
  @Post(':id/delivery')
  createDelivery(
    @Param('id') id: string,
    @Body() data: { supplierId: number; pickup: string; destination: string; recipient: string; serviceType: string }
  ) {
    return this.clientService.createDelivery(parseInt(id), data);
  }

  //Listar Entregas do Cliente
  @Get(':id/delivery')
  getDeliverysByClient(@Param('id') id: string) {
    return this.clientService.getDeliverysByClient(parseInt(id));
  }

  //Consultar Entrega Específica
  @Get(':id/delivery/:deliveryId')
  getDeliveryById(@Param('id') id: string, @Param('deliveryId') deliveryId: string) {
    return this.clientService.getDeliveryById(parseInt(id), parseInt(deliveryId));
  }
}
