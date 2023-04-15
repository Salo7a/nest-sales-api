import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'mysql',
  database: process.env.DB_NAME || 'test',
  logging: true,
  entities: [
    __dirname + '/user/*.entity.ts',
    __dirname + '/item/*.entity.ts',
    __dirname + '/invoice/*.entity.ts',
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  subscribers: [],
});

export default AppDataSource;
