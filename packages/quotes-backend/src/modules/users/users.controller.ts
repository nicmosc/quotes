import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { GetUser, User, UserRequest } from '@quotes/schema';

import { AuthGuard } from '../auth/guards';
import { CurrentUser } from './decorators';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@CurrentUser() currentUser: { email: string }): Promise<ReturnType<GetUser>> {
    const user = this.usersService.findOneByEmail(currentUser.email);
    if (user == null) {
      if (user == null) {
        throw new NotFoundException(`Current user not found`);
      }
    }
    return { data: user };
  }

  @Get(':id')
  async user(@Param() params: UserRequest): Promise<ReturnType<GetUser>> {
    const user = await this.usersService.findOneById(params.id);
    if (user == null) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
    return { data: user };
  }
}
