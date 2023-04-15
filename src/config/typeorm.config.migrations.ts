import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [
    '/src/user/*.entity.ts',
    '/src/item/*.entity.ts',
    '/src/invoice/*.entity.ts',
  ],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});

export default AppDataSource;
