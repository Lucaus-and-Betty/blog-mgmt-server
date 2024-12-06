import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.NODE_ENV_DB_HOST,
  port: Number(process.env.NODE_ENV_DB_PORT),
  username: process.env.NODE_ENV_DB_USER,
  password: process.env.NODE_ENV_DB_PASSWORD,
  database: 'blog_db',
  autoLoadEntities: true,
  synchronize: false,
  entities: [],
};
