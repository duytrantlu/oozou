import { json } from 'body-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

const validationPipeOptions = {
  transform: true,
  validateCustomDecorators: true,
  validationError: {
    target: false,
    value: false,
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  const logger = app.get(Logger);
  app.useLogger(logger)
  app.use(helmet());
  app.use(json({
    type: 'application/vnd.api+json'
  }));
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  const options = new DocumentBuilder()
    .setTitle('NestJS JSON:API')
    .setDescription('NestJS JSON:API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://{host}:{port}', 'Server description', {
      host: {
        default: 'localhost'
      },
      port: {
        default: 3001
      }
    })
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  const nodeEnv = configService.get('nodeEnv')
  await app.listen(port);
  logger.log(`Application is running in ${nodeEnv} mode and listening on port ${port}`, 'NestApplication')
}
bootstrap();
