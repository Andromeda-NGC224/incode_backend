import { AppDataSource } from './database.data-source';

export const connectDatabase = async () => {
  await AppDataSource.initialize();
  console.log('📦 Connected to PostgreSQL');
};
