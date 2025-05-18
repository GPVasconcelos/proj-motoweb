import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
