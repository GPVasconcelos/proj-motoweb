import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CentralFornecedorService } from './central-fornecedor.service';
import { CentralFornecedorController } from './central-fornecedor.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CentralFornecedorController],
  providers: [CentralFornecedorService],
})
export class CentralFornecedorModule {}
