import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawingService } from 'src/app/shared/services/drawing';
import { MessageService } from 'src/app/shared/services/message';
import { PlayerService } from 'src/app/shared/services/player';
import { RoomService } from 'src/app/shared/services/room';

@Component({
  selector: 'app-main',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  providers: [MessageService],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    public drawingService: DrawingService,
    public roomService: RoomService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    if (this.roomService.currentRoom) {
      const room = this.roomService.currentRoom;
      this.roomService.emitJoinRoom(room);
      this.roomService.emitUpdateRoom(room);
      // this.roomService.joinRoom(
      //   this.playerService.player,
      //   this.roomService.currentRoom
      // );
    }
  }

  ngOnDestroy(): void {}
}
