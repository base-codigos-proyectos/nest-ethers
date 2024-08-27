/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ContractsModule } from './features/contracts/contracts.module';
import { ProviderModule } from './features/provider/provider.module';
import { PgModule } from './shared/modules/pg/pg.module';
import { AppGraphQLModule } from './shared/modules/graphql/graphql.module';
import { AdminModule } from './features/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PgModule,
    AppGraphQLModule,

    ContractsModule,

    ProviderModule,

    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
