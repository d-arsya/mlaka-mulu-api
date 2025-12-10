import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'mlakumulu_db',

  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*.ts'],

  logging: true,
  synchronize: false,
});
export default AppDataSource;
