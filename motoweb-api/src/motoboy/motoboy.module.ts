import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MotoboyService } from './motoboy.service';
import { MotoboyController } from './motoboy.controller';

@Module({
  // Importa o módulo do Prisma para acesso ao banco de dados
  imports: [PrismaModule],

  // Controlador responsável pelas rotas da entidade Motoboy
  controllers: [MotoboyController],

  // Serviço que contém a lógica de negócio relacionada ao Motoboy
  providers: [MotoboyService],
})
export class MotoboyModule {}
