import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/interfaces';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: { email: string; password: string }) {
    const existingUser = await this.validateUser(user.email, user.password);
    if (existingUser != null) {
      const payload = { email: user.email, sub: user.password };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new NotFoundException();
    }
  }
}
