import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(name: string) {
    return this.http.post(environment.baseUrl + '/login', { name });
  }

  isLoggedIn(): boolean {
    return window.sessionStorage.getItem('player') ? true : false;
  }
}
