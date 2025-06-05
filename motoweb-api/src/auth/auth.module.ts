import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // Módulos importados para uso interno deste módulo
  imports: [
    PassportModule, // Necessário para autenticação com Passport
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Chave secreta usada para assinar/verificar o token
      signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
    }),
    PrismaModule, // Serviço de acesso ao banco de dados via Prisma
  ],
  // Controladores que expõem as rotas HTTP relacionadas à autenticação
  controllers: [AuthController],
  // Serviços e estratégias disponíveis para injeção de dependência
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
