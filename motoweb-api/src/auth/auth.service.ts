import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string, phone: string, address: string) {
  const existingUser = await this.prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new UnauthorizedException('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await this.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      profileType: 'USER',
      phone,
      address,
    },
  });

  return this.generateToken(newUser.id, newUser.email);
}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateToken(user.id, user.email);
  }

  private generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}


