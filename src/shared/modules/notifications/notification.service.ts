import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../redis/redisSub.module';

@Injectable()
export class NotificationsService {
  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}

  async publishNotification(notification: any) {
    await this.pubSub.publish('NOTIFICATIONS_TOPIC', notification);
  }
}
