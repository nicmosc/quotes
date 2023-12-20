import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ErrorsInterceptor } from '../../interceptors';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    QuotesService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   // We set up a custom interceptor and throw a Bad Gateway error since
    //   // failures will most likely be caused by the third party quotes service
    //   useClass: ErrorsInterceptor,
    // },
  ],
  controllers: [QuotesController],
  exports: [QuotesService],
})
export class QuotesModule {}
