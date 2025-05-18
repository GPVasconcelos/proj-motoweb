import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './cliente/cliente.module';
import { MotoboyModule } from './motoboy/motoboy.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { SupplierModule } from './supplier/supplier.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ClientModule,
    MotoboyModule,
    VehicleModule,
    SupplierModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
