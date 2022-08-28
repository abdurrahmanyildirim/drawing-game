import { Injectable } from '@angular/core';
import { Player } from './model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  player: Player;

  initPlayer(): void {
    const player = window.sessionStorage.getItem('player');
    this.player = JSON.parse(player);
  }
}
