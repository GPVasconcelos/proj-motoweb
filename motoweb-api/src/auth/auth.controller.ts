import { Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthLoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //  Cadastro de usuário
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  //  Login de usuário
  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    return this.authService.login(email, password);
  }

  //  Listar todos os usuários
  @Get('users')
  getUsers() {
    return this.authService.findAll();
  }

  //  Buscar usuário por ID
  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.authService.findOne(Number(id));
  }

  //  Atualizar usuário
  @Patch('users/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.update(Number(id), updateUserDto);
  }

  //  Deletar usuário (Soft Delete)
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.remove(Number(id));
  }
}