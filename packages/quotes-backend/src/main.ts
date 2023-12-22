import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}

bootstrap();
