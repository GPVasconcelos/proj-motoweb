import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
async register(
  @Body('email') email: string,
  @Body('password') password: string,
  @Body('name') name: string,
  @Body('phone') phone: string,
  @Body('address') address: string,
) {
  return this.authService.register(email, password, name, phone, address);
}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}

