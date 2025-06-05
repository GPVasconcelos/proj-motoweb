import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    // Configuração do passport-jwt
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do header Authorization: Bearer
      ignoreExpiration: false, // Rejeita tokens expirados
      secretOrKey: process.env.JWT_SECRET, // Segredo usado para assinar/verificar o token
    });
  }

  /**
   * Método chamado automaticamente para validar o token JWT
   * @param payload Dados decodificados do token (sub = ID do usuário, email)
   * @returns Usuário autenticado ou lança exceção
   */
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    // Retorna o objeto do usuário que será injetado no request (req.user)
    return user;
  }
}
