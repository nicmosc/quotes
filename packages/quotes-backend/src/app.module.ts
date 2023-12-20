import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

import { DelayerMiddleware, LoggerMiddleware } from './middlewares';
import { AuthModule } from './modules/auth';
import { QuotesModule } from './modules/quotes';
import { UsersModule } from './modules/users';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    QuotesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        QUOTES_SERVICE_URL: joi.string(),
        PORT: joi.number().default(3000),
      }),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayerMiddleware({ delay: 2000 })).forRoutes('/auth/login');
    consumer.apply(LoggerMiddleware);
  }
}
