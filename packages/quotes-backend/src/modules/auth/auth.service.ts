import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@quotes/schema';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = (await this.usersService.findOneByEmail(email, true)) as User & {
      password: string;
    };
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
        // TODO return refreshToken as well
        token: this.jwtService.sign(payload),
      };
    } else {
      throw new NotFoundException();
    }
  }
}
