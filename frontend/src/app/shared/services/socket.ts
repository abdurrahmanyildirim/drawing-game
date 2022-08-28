import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  drawStream = new BehaviorSubject(null);

  constructor(private socket: Socket) {}

  connect(): void {
    this.socket.connect();
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  emitDrawing(content: Uint8Array) {
    this.socket.emit('drawing', content);
  }

  onDrawing(): Observable<any> {
    return this.socket.fromEvent('drawing');
  }

  onNewRoomCreated(): Observable<any> {
    return this.socket.fromEvent('newRoom');
  }

  emitNewRoom(): void {
    this.socket.emit('newRoom');
  }

  getMessage() {
    // return this.socket.fromEvent('message').pipe(map((data) => data.msg));
  }
}
