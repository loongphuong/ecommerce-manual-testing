import 'dotenv/config';
import { join } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { Environment } from '../constants';

const connectionOptions: TypeOrmModuleOptions &
  SeederOptions &
  DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_POSTGRES_PORT || '5432', 10),
  username: process.env.DATABASE_POSTGRES_USERNAME,
  password: process.env.DATABASE_POSTGRES_PASSWORD,
  database: process.env.DATABASE_POSTGRES_NAME,
  connectTimeoutMS: 0,
  logNotifications: true,
  synchronize:
    [String(Environment.local), String(Environment.test)].indexOf(
      process.env.ENV,
    ) !== -1
      ? true
      : false,
  entities: [join(__dirname, '..', 'modules/**/*.entity.{ts,js}')],
  poolErrorHandler: (err) => {
    console.log(err);
  },
  migrationsTableName: 'migration',
  migrations: [join(__dirname, '..', 'database/migrations/*{.js,.ts}')],
  seeds: [join(__dirname, '..', 'modules/**/*.seeder.{ts,js}')],
  factories: [join(__dirname, '..', 'modules/**/*.factory.{ts,js}')],
  subscribers: [join(__dirname, '..', 'modules/**/*.subscriber.{ts,js}')],
};

const dataSource = new DataSource(connectionOptions);

export { connectionOptions, dataSource };
