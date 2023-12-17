import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { DelayerMiddleware } from './middlewares';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';

@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayerMiddleware({ delay: 2000 })).forRoutes('/auth/login');
  }
}
