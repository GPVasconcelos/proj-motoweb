import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Mapeia o usuário retornado do banco para a entidade usada na API
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

  // Cria um novo usuário, aplicando hash na senha e validando duplicidade de e-mail
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, phone, address, password, profileType } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    // Valida se já existe um usuário com o mesmo e-mail
    if (existingUser) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco
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

    // Retorna a entidade mapeada
    return this.mapToUserEntity(user);
  }

  // Realiza o login validando o e-mail e senha, e gera um token JWT
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Verifica se o usuário existe
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Compara a senha informada com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Senha inválida
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Retorna o token
    return this.generateToken(user.id, user.email, user.profileType);
  }

  // Gera o JWT contendo o ID, e-mail e perfil do usuário
  private generateToken(userId: number, email: string, profileType: string) {
    const payload = { sub: userId, email, profileType };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // Retorna todos os usuários ativos (não deletados)
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { isDeleted: false },
    });

    return users.map(this.mapToUserEntity);
  }

  // Busca um usuário específico pelo ID
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    // Verifica se o usuário foi deletado ou não existe
    if (!user || user.isDeleted) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.mapToUserEntity(user);
  }

  // Atualiza os dados de um usuário existente
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user || user.isDeleted) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Se a senha foi alterada, aplica novo hash; caso contrário, mantém a anterior
    const hashedPassword = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : user.password;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        address: updateUserDto.address,
        password: hashedPassword,
        profileType: updateUserDto.profileType,
      },
    });

    return this.mapToUserEntity(updatedUser);
  }

  // Aplica soft delete no usuário (não remove fisicamente)
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
