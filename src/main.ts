import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

export const options = {
  origin: '',
  allowedHeaders: 'Content-Type, Accept',
  credentials: true,
  methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
  header: 'Access-Control-Allow-Origin: *',
};

export const globalSet = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableCors(options);
  app.setGlobalPrefix(globalSet);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
