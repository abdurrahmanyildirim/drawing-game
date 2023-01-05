import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DrawingService } from 'src/app/shared/services/drawing';
import { GameService } from 'src/app/shared/services/game';
import { MessageService } from 'src/app/shared/services/message';
import { PlayerService } from 'src/app/shared/services/player';
import { RoomService } from 'src/app/shared/services/room';
import { SessionStorageService } from 'src/app/shared/services/session-storage';
import { SessionKey } from 'src/app/shared/services/session-storage/model';

@Component({
  selector: 'app-main',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  providers: [MessageService, GameService],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    public roomService: RoomService,
    public playerService: PlayerService,
    public gameService: GameService,
    private drawingService: DrawingService,
    private sessionStorageService: SessionStorageService
  ) {}

  // @HostListener('window:beforeunload', ['$event'])
  // onbeforeunload(event) {
  //   event.preventDefault();
  //   event.returnValue = false;
  // }

  ngOnInit(): void {
    this.gameService.init();
    this.drawingService.listenDrawedImage();
    if (this.roomService.currentRoom) {
      const room = this.roomService.currentRoom;
      console.log(this.playerService.player);
      this.roomService.emitJoinRoom(room, this.playerService.player);
      this.roomService.emitUpdateRoom(room);
      // this.roomService.joinRoom(
      //   this.playerService.player,
      //   this.roomService.currentRoom
      // );
    }
  }

  ngOnDestroy(): void {
    console.log('Main Destroyed');
    this.sessionStorageService.removeItem(SessionKey.Room);
  }
}
