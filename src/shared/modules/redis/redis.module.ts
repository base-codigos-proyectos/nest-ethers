import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_HOST', 'redis://localhost:6379');

        const redis = new Redis(redisUrl);

        // Logger para mostrar el estado de la conexión
        const logger = new Logger('RedisModule');

        redis.on('connect', () => {
          logger.log('Conexión a Redis exitosa');
        });

        redis.on('error', (error) => {
          logger.error('Conexión a Redis fallida', error.message);
        });

        return redis;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
