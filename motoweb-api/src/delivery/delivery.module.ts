import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
