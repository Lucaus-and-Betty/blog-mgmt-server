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
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

@Module({
  imports: [
    MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        // destination: join('/root/server/blog-imgs'),
        destination: (_, file, callback) => {
          console.log('file', process.env.NODE_ENV_MUSICS);
          // 取 file.originalname 的文件名最后三个字符如果是 mp3 就换个文件夹
          if (extname(file.originalname) === '.mp3') {
            // 解析 mp3 文件获取歌名和歌手
            return callback(null, join(process.env.NODE_ENV_MUSICS));
          }
          callback(null, join(process.env.NODE_ENV_IMGS));
        },
        filename: (_, file, callback) => {
          if (extname(file.originalname) === '.mp3') {
            // 使用原文件名存储
            return callback(
              null,
              decodeURIComponent(escape(file.originalname)),
            );
          }
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
