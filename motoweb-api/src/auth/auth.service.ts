import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  //Mapear para UserEntity
  private mapToUserEntity(user: any): UserEntity {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      password: user.password,
      profileType: user.profileType,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  //Cadastrar Usuário
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, phone, address, password, profileType } =
      createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        profileType,
      },
    });

    return this.mapToUserEntity(user);
  }

  //Login
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.generateToken(user.id, user.email);
  }

  //Gerar Token
  private generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  //Listar todos os usuários
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { isDeleted: false },
    });
    return users.map(this.mapToUserEntity);
  }

  //Buscar usuário por ID
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.mapToUserEntity(user);
  }

  //Atualizar usuário
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user || user.isDeleted) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        address: updateUserDto.address,
        password: updateUserDto.password
          ? await bcrypt.hash(updateUserDto.password, 10)
          : user.password,
        profileType: updateUserDto.profileType,
      },
    });

    return this.mapToUserEntity(updatedUser);
  }

  //Deletar usuário
  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user || user.isDeleted) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return { message: 'Usuário deletado com sucesso' };
  }
}
