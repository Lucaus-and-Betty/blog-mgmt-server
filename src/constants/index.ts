import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

if (process.env.RUNNING_ENV !== 'prod') {
  dotenv.config({ path: `.env.dev` });
} else {
  dotenv.config({ path: '.env.prod' });
}

console.log(process.env.NODE_ENV_DB_HOST);

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

export const JWT_CONFIG = {
  secret: 'Betty & Lucaus',
  signOptions: { expiresIn: '2d' },
};

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
