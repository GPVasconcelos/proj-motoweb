import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
  // Importa o módulo do Prisma para permitir injeção do PrismaService
  imports: [PrismaModule],

  // Controlador que expõe as rotas relacionadas à Central Fornecedora
  controllers: [SupplierController],

  // Serviço com a lógica de negócio das operações de supplier
  providers: [SupplierService],
})
export class SupplierModule {}
