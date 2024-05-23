import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, [string, string]>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    let disconnectedUser: string;

    for (let [user, [clientId, socketId]] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        disconnectedUser = user;
        this.connectedUsers.delete(user);
        break;
      }
    }

    this.server.emit('users', Array.from(this.connectedUsers.keys()));
    this.server.emit('user-disconnect', disconnectedUser);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, nickname: string): void {
    console.log(`User joined with nickname: ${nickname}`);
    this.connectedUsers.set(nickname, [client.id, client.id]);
    this.server.emit('users', Array.from(this.connectedUsers.keys()));
    this.server.emit('user-details', [nickname, client.id]);
    this.sendBotMessages(client);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { sender: string, text: string }): void {
    client.broadcast.emit('message', payload);
  }

  private sendBotMessages(client: Socket) {
    setTimeout(() => {
      client.emit('message', {
        sender: 'Bot 1',
        text: 'Hello everyone!',
      });
    }, 2000);

    setTimeout(() => {
      client.emit('message', {
        sender: 'Bot 2',
        text: "How's it going?",
      });
    }, 5000);

    setTimeout(() => {
      client.emit('message', {
        sender: 'Bot 1',
        text: 'I could chat here all day!',
      });
    }, 8000);
  }
}
