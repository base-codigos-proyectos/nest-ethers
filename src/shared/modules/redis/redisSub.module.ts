import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Global, Module, Logger } from '@nestjs/common';
import Redis from 'ioredis';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_HOST', 'redis://localhost:6379');

        const logger = new Logger('PubSubModule');

        // Crear instancias de publisher y subscriber usando ioredis
        const publisher = new Redis(redisUrl);
        const subscriber = new Redis(redisUrl);

        // Logger para la conexión del publisher
        publisher.on('connect', () => {
          logger.log('Conexión al publicador de Redis exitosa');
        });

        publisher.on('error', (error) => {
          logger.error('Error en la conexión al publicador de Redis', error.message);
        });

        // Logger para la conexión del subscriber
        subscriber.on('connect', () => {
          logger.log('Conexión al suscriptor de Redis exitosa');
        });

        subscriber.on('error', (error) => {
          logger.error('Error en la conexión al suscriptor de Redis', error.message);
        });

        return new RedisPubSub({
          publisher,
          subscriber,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
