import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { Room } from '../room/model';
import { Message } from './model';

@Injectable()
export class MessageService {
  msgStream$ = new Subject();

  constructor(private socket: Socket) {}

  send(message: Message, room: Room): void {
    this.socket.emit('message', message, room);
  }

  listenNewMessage(): void {
    this.socket.on('message', (message: Message) => {
      this.msgStream$.next(message);
    });
  }
}
