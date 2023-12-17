import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/guards';
// import { DelayerInterceptor } from 'src/interceptors';
import { CurrentUser } from './decorators';
import { User } from './interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<User | undefined> {
    return this.usersService.findOneById(user.id);
  }

  @Get(':id')
  async user(@Param() params: { id: string }): Promise<User> {
    const user = await this.usersService.findOneById(params.id);
    if (user == null) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
    return user;
  }
}
