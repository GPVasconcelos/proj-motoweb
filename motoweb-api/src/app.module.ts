import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { MotoboyModule } from './motoboy/motoboy.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CentralFornecedorModule } from './central-fornecedor/central-fornecedor.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, ClienteModule, MotoboyModule, VehicleModule, CentralFornecedorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
