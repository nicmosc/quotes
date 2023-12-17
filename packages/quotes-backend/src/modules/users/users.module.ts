import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UsersController],
  exports: [UsersService],
})
export class UsersModule {}
