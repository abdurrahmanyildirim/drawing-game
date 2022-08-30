import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage';
import { SessionKey } from '../session-storage/model';
import { Player } from './model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  player: Player;

  constructor(private sessionService: SessionStorageService) {}

  initPlayer(): void {
    this.player = this.sessionService.getItem(SessionKey.Player);
  }
}
