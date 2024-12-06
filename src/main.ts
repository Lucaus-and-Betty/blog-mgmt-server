import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: (origin, callback) => {
      console.log(origin);
      if (
        [
          'http://localhost:5174',
          'http://116.196.66.106:8081',
          'http://116.196.66.106:8082',
        ].includes(origin)
      ) {
        callback(null, true); // 允许跨域
      } else {
        callback(new Error('Not allowed by CORS')); // 拒绝跨域
      }
    },
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Accept, Authorization, x-requested-with',
  });
  await app.listen(3001);
}
bootstrap();
