import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Login } from '@quotes/schema';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: Parameters<Login>[0]): Promise<ReturnType<Login>> {
    return this.authService.login(signInDto);
  }
}
