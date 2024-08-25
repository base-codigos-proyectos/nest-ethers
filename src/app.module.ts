/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


import { ContractsModule } from './features/contracts/contracts.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),


    ContractsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
