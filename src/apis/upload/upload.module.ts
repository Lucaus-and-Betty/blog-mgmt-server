import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { generateUUID } from 'src/utils/generateUUID';
import { UploadController } from './upload.controller';
import * as dayjs from 'dayjs';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { JWT_CONFIG } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        destination: join('/root/server/blog-imgs'),
        filename: (_, file, callback) => {
          const fileName = `${dayjs().format('YYYY-MM-DD') + '-' + generateUUID() + extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [UploadController],
  providers: [JwtStrategy],
})
export class UploadModule {}
