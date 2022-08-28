import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../player/model';
import { SocketService } from '../socket';
import { Room } from './model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms = new BehaviorSubject([]);
  currentRoom: Room;
  constructor(private http: HttpClient, private socketService: SocketService) {}

  init(): Observable<void> {
    return new Observable((observer) => {
      const sub = this.getRooms().subscribe({
        next: (rooms: Room[]) => {
          this.rooms.next(rooms);
          this.listenRoomUpdate();
          this.currentRoom = JSON.parse(window.sessionStorage.getItem('room'));
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

  listenRoomUpdate(): void {
    this.socketService.onNewRoomCreated().subscribe({
      next: (rooms) => {
        console.log(rooms);
        this.rooms.next(rooms);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
