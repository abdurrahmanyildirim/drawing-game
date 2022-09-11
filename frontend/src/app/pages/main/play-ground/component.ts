import { Component } from '@angular/core';
import { DrawingService } from 'src/app/shared/services/drawing';
import { GameService } from 'src/app/shared/services/game';
import { PlayerService } from 'src/app/shared/services/player';
import { RoomService } from 'src/app/shared/services/room';

@Component({
  selector: 'app-play-ground',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class PlayGroundComponent {
  constructor(
    public drawingService: DrawingService,
    public roomService: RoomService,
    public playerService: PlayerService,
    public gameService: GameService
  ) {}

  startGame(): void {
    this.gameService.break();
    // this.gameService.game = {

    // }
  }

  playAgain():void {

  }

  leave():void {
    
  }
}
