import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MobilDetectionService } from './mobile-detection';
import { PlayerService } from './player';
import { RoomService } from './room';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  isInitialized = false;

  constructor(
    private roomService: RoomService,
    private mobildDetectionService: MobilDetectionService,
    private playerService: PlayerService
  ) {}

  init(): void {
    const obs = [this.roomService.init()];
    forkJoin(obs).subscribe({
      next: () => {
        // this.socketService.connect();
        this.playerService.initPlayer();
        this.mobildDetectionService.init();
        this.isInitialized = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
