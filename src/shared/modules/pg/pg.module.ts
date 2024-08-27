import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'deploy',
      password: 'api',
      database: 'db_deploy',
      synchronize: true,
      autoLoadEntities: true,
      // logging: true,

      entities: [
        __dirname + '/src/**/*.entity{.ts,.js}', 
      ],
      migrations: [
        __dirname + '/src/migration/**/*{.ts,.js}', 
      ],
    }),
    TypeOrmModule.forFeature([]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class PgModule {}
