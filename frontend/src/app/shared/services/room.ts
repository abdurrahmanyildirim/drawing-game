import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  createRoom(room: any): Observable<any> {
    return this.http.post('http://localhost:3000/create-room', room);
  }

  getRooms() {
    return this.http.get('http://localhost:3000/rooms');
  }
}
