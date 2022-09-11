import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerService } from '../player';
import { Player } from '../player/model';
import { SessionStorageService } from '../session-storage';
import { SessionKey } from '../session-storage/model';
import { Room } from './model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms = new BehaviorSubject([]);
  currentRoom: Room;
  constructor(
    private http: HttpClient,
    private socket: Socket,
    private sessionService: SessionStorageService
  ) {}

  init(): Observable<void> {
    return new Observable((observer) => {
      const sub = this.getRooms().subscribe({
        next: (rooms: Room[]) => {
          this.rooms.next(rooms);
          // this.listenRoomUpdate();
          this.listenNewRoomCreated();
          this.listenRoomUpdate();
          this.currentRoom = this.sessionService.getItem(SessionKey.Room);
          observer.next();
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
      return {
        unsubscribe: () => {
          sub.unsubscribe();
        },
      };
    });
  }

  listenNewRoomCreated(): void {
    this.socket.on('newRoom', (rooms: Room[]) => {
      // console.log(rooms);
      this.rooms.next(rooms);
    });
  }

  listenRoomUpdate(): void {
    this.socket.on('updateRoom', (room: Room) => {
      this.sessionService.setItem(SessionKey.Room, room);
      this.currentRoom = room;
    });
  }

  updatePlayerInRoom(player: Player): void {
    const index = this.currentRoom.players.indexOf(player);
    this.currentRoom.players[index] = player;
    this.emitUpdateRoom(this.currentRoom);
  }

  emitNewRoom(room: Room): void {
    this.socket.emit('newRoom', room);
  }

  emitJoinRoom(room: Room): void {
    this.socket.emit('joinRoom', room);
  }

  emitLeaveRoom(room: Room): void {
    this.socket.emit('leaveRoom', room);
  }

  leaveRoom(player: Player, room: Room): Observable<any> {
    return this.http.post(environment.baseUrl + '/leave-room', {
      player,
      room,
    });
  }

  emitUpdateRoom(room: Room): void {
    this.socket.emit('updateRoom', room);
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(environment.baseUrl + '/create-room', room);
  }

  getRooms() {
    return this.http.get(environment.baseUrl + '/rooms');
  }

  joinRoom(player: Player, room: Room): Observable<any> {
    return this.http.post(environment.baseUrl + '/join-room', { player, room });
  }
}
