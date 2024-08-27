import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';
// import { envs } from './shared';

async function bootstrap() {


  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody:true

  });
  app.use(json({ limit: '60mb' }));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });


  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API')
    .setDescription('DESCRPCION')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);


}
bootstrap();