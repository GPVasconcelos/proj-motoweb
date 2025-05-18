import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientService } from './cliente.service';
import { ClientController } from './cliente.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
