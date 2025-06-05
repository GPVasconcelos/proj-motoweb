import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Rota para cadastro de novo usuário
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // Rota para login do usuário
  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    return this.authService.login(email, password);
  }

  // Rota para listar todos os usuários não deletados
  @Get('users')
  getUsers() {
    return this.authService.findAll();
  }

  // Rota para buscar um usuário pelo ID
  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.authService.findOne(Number(id));
  }

  // Rota para atualizar os dados de um usuário
  @Patch('users/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.update(Number(id), updateUserDto);
  }

  // Rota para deletar (soft delete) um usuário
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.remove(Number(id));
  }
}
