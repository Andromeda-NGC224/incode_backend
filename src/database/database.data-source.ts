import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { databaseEnvConfig } from './database.config';

export const AppDataSource = new DataSource({
  ...databaseEnvConfig,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: ['**/*.entity.ts'],
  migrations: [],
  subscribers: [],
});
