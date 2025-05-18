import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
