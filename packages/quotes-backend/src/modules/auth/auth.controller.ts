import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body() signInDto: { email: string; password: string }) {
    return this.authService.login(signInDto);
  }
}
