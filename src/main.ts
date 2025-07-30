import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API documentation for Todo application')
    .setVersion('1.0')
    .addTag('Todos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log(
      `Server is running on http://localhost:${process.env.PORT}`,
      'Bootstrap',
    );
    Logger.log(
      `API documentation available at http://localhost:${process.env.PORT}/api/docs`,
      'Bootstrap',
    );
  });
}
bootstrap();
