import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientService } from './cliente.service';
import { ClientController } from './cliente.controller';

@Module({
  // Módulos externos que este módulo depende 
  imports: [PrismaModule],

  // Controladores responsáveis por expor as rotas do módulo
  controllers: [ClientController],

  // Serviços que contêm a lógica de negócio (injeção de dependência)
  providers: [ClientService],
})
export class ClientModule {}
