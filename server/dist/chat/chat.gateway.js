"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.connectedUsers = new Map();
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        let disconnectedUser;
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
    handleJoin(client, nickname) {
        console.log(`User joined with nickname: ${nickname}`);
        this.connectedUsers.set(nickname, [client.id, client.id]);
        this.server.emit('users', Array.from(this.connectedUsers.keys()));
        this.server.emit('user-details', [nickname, client.id]);
        this.sendBotMessages(client);
    }
    handleMessage(client, payload) {
        client.broadcast.emit('message', payload);
    }
    sendBotMessages(client) {
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
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map