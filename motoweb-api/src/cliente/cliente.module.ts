import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from '../cliente/cliente.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
