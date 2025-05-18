import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  createCliente(@Body('userId') userId: string, @Body() data: any) {
    return this.clienteService.createCliente(parseInt(userId), data);
  }

  @Get()
  getAllClientes() {
    return this.clienteService.getAllClientes();
  }

  @Get(':id')
  getClienteById(@Param('id') id: string) {
    return this.clienteService.getClienteById(parseInt(id));
  }
 
  @Patch(':id')
  updateCliente(@Param('id') id: string, @Body() data: any) {
    return this.clienteService.updateCliente(parseInt(id), data);
  }

  @Delete(':id')
  deleteCliente(@Param('id') id: string) {
    return this.clienteService.deleteCliente(parseInt(id));
  }
}