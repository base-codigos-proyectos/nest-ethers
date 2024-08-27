import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Inject, Logger } from '@nestjs/common';
  import { RedisPubSub } from 'graphql-redis-subscriptions';
import { NotificationsService } from './notification.service';
import { PUB_SUB } from '../redis/redisSub.module';
  
  @WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000',
    },
  })
  export class NotificationsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer()
    server: Server;
  
    constructor(
      private readonly notificationsService: NotificationsService,
      @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
      private readonly logger: Logger,
    ) {}
  
    async handleConnection(socket: Socket) {
      this.logger.log(`Cliente conectado: ${socket.id}`);
      // Puedes suscribir al cliente a un canal específico si lo deseas
    }
  
    async handleDisconnect(socket: Socket) {
      this.logger.log(`Cliente desconectado: ${socket.id}`);
      // Manejar desconexión de clientes
    }
  
    async sendNotification(notification: any) {
      this.server.emit('receive_notification', notification);
    }
  
    async listenForNotifications() {
      await this.pubSub.subscribe('NOTIFICATIONS_TOPIC', (message) => {
        this.sendNotification(message);
      });
    }
  }
  