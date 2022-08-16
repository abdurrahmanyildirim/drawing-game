import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  drawStream = new BehaviorSubject(null);

  constructor(private socket: Socket) {
    console.log('SocketService');
  }

  connect(): void {
    this.socket.connect();
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  emitDrawing(content: Uint8Array) {
    this.socket.emit('drawing', content);
  }

  onDrawing() {
    return this.socket.fromEvent('drawing');
  }

  getMessage() {
    // return this.socket.fromEvent('message').pipe(map((data) => data.msg));
  }
}
