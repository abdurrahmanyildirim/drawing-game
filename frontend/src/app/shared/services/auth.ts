import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage';
import { SessionKey } from './session-storage/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionStorageService
  ) {}

  login(name: string) {
    return this.http.post(environment.baseUrl + '/login', { name });
  }

  isLoggedIn(): boolean {
    return this.sessionService.getItem(SessionKey.Player) ? true : false;
  }
}
