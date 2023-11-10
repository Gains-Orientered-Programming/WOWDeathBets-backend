import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ensureEnvVariables } from './commands/util/utils';

dotenv.config();

ensureEnvVariables([
	'DB_HOST',
	'DB_PORT',
	'DB_NAME',
	'DB_PASSWORD',
	'DB_USER',
	'SUPABASE_SERVICE_KEY',
	'SUPABASE_URL',
]);

export const AppDataSourceSync = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	schema: 'public',
	synchronize: true,
	logging: true,
	entities: ['src/entities/**/*.ts'],
	migrations: [],
	subscribers: [],
});

export const AppDataSourceNoSync = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	schema: process.env.DB_SCHEMA,
	synchronize: false,
	logging: true,
	entities: ['src/entities/**/*.ts'],
	migrations: [],
	subscribers: [],
});
