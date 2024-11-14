import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../apis/users/users.entities';
import { New } from '../apis/news/news.entities';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'blog_db',
  autoLoadEntities: true,
  synchronize: false,
  entities: [Users, New],
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
