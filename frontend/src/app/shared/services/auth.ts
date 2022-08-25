import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  constructor(private http: HttpClient) {}

  login(name: string) {
    return this.http.post('http://localhost:3000/login', { name });
  }

  isLoggedIn(): boolean {
    return window.sessionStorage.getItem('user') ? true : false;
  }
}
