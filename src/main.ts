import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { setupSwagger } from './configs/setup-swagger';
import { API_PREFIX, API_VERSION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix(`/${API_PREFIX}/${API_VERSION}`);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
    }),
  );

  setupSwagger(app);

  await app.listen(configService.get('APP_PORT')).then(() => {
    Logger.log('Server listening on port ' + configService.get('APP_PORT'));
  });
}
bootstrap();
