import { DataSource } from 'typeorm';
import * as process from 'node:process';
import type { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { config } from 'dotenv';

config({
  path: '.env',
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrations: ['src/database/migrations/**'],
  seeds: ['dist/database/seeders/**.js'],
  entities: ['dist/**/*.entity.js'],
} as DataSourceOptions & { seeds: string[] });
