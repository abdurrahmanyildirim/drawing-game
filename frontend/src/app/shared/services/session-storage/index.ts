import { Injectable } from '@angular/core';
import { SessionKey } from './model';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  setItem(key: SessionKey, data: any): void {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }

  getItem<T>(key: SessionKey): T {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  removeItem(key: SessionKey): void {
    window.sessionStorage.removeItem(key);
  }
}
