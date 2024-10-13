import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let configService = app.get(ConfigService);
  let logger = new Logger();

  let port = configService.get('APP_PORT');
  logger.log(`app is listening on port ${port}`);

  await app.listen(port);
}
bootstrap();
