import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  
  // Apply the pipe for any incomming request to the instance app
  app.useGlobalPipes(
    new ValidationPipe()
  );

  const config = new DocumentBuilder()
    .setTitle('Message example')
    .setDescription('The Message API description')
    .setVersion('1.0')
    .addTag('messages')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
