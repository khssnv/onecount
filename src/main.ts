import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('One count').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}

bootstrap();