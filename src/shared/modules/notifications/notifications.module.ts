import { Module, Logger } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { PubSubModule } from '../redis/redisSub.module';
import { NotificationsService } from './notification.service';
import { NotificationsGateway } from './NotificationsGateway';


@Module({
  imports: [RedisModule, PubSubModule],
  providers: [
    NotificationsGateway,
    NotificationsService,
    {
      provide: Logger,
      useValue: new Logger('NotificationsModule'),
    },
  ],
})
export class NotificationsModule {}
