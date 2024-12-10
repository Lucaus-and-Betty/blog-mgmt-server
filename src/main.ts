import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors({
    // origin: 'http://127.0.0.1:5174',
    origin: 'http://116.196.66.106:8082',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Accept, Authorization, x-requested-with',
  });
  await app.listen(3001);
}
bootstrap();
