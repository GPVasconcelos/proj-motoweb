import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MotoboyService } from './motoboy.service';
import { MotoboyController } from './motoboy.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MotoboyController],
  providers: [MotoboyService],
})
export class MotoboyModule {}
