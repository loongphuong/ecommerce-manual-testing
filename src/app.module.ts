import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';

import { connectionOptions } from './database/ormconfig';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import I18nModuleConfig from './i18n';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModuleConfig,
    TypeOrmModule.forRoot(connectionOptions),
    HealthCheckerModule,
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (i18n: I18nService) => {
        return new HttpExceptionFilter(i18n);
      },
      inject: [I18nService],
    },
  ],
})
export class AppModule {}
