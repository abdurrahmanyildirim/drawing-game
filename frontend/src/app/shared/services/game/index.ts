import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DrawingService } from '../drawing';
import { MessageService } from '../message';
import { Player } from '../player/model';
import { RoomService } from '../room';
import { Room } from '../room/model';
import { Game, GameStatus } from './model';

@Injectable()
export class GameService {
  game: Game;
  drawingInterval = null;
  breakInterval = null;

  constructor(
    private messageService: MessageService,
    private roomService: RoomService,
    private socket: Socket,
    private drawingService: DrawingService
  ) {
    setTimeout(() => {
      this.listenGameChanges();
    });
  }

  init(): void {
    this.game = {
      breakTime: 10,
      drawTime: 20,
      status: GameStatus.Inactive,
    };
  }

  startRound(): void {
    this.break();
  }

  nextRound(): void {
    clearInterval(this.drawingInterval);
    this.game = {
      ...this.game,
      status: GameStatus.Playing,
    };
    this.emitChangesOnGame();
    this.drawingInterval = setInterval(() => {
      this.game.drawTime -= 1;
      if (this.game.drawTime === 0) {
        clearInterval(this.drawingInterval);
        this.resetValues();
        this.break();
        return;
      }
      this.emitChangesOnGame();
    }, 1000);
  }

  break(): void {
    this.game = {
      ...this.game,
      currentPlayer: this.getRandomPlayer(),
      status: GameStatus.RoundBreak,
      word: this.getRandomWord(),
    };
    if (this.game.currentPlayer === null) {
      this.endGame();
      return;
    }
    this.emitChangesOnGame();
    clearInterval(this.breakInterval);
    this.breakInterval = setInterval(() => {
      this.game.breakTime -= 1;
      if (this.game.breakTime === 0) {
        clearInterval(this.breakInterval);
        this.nextRound();
        return;
      }
      this.emitChangesOnGame();
    }, 1000);
  }

  resetValues(): void {
    this.game = {
      ...this.game,
      breakTime: 10,
      drawTime: 20,
    };
    this.drawingService.clean();
    this.emitChangesOnGame();
  }

  endGame(): void {
    this.game = {
      ...this.game,
      status: GameStatus.End,
    };
    this.emitChangesOnGame();
  }

  getRandomPlayer(): Player {
    const foo = this.roomService.currentRoom.players.filter(
      (player) => !player.didDraw
    );
    if (foo.length <= 0) {
      return null;
    }
    const ranmdomPlayer = foo[Math.floor(Math.random() * foo.length)];
    ranmdomPlayer.didDraw = true;
    // this.roomService.updatePlayerInRoom(ranmdomPlayer);
    return ranmdomPlayer;
  }

  emitChangesOnGame(): void {
    this.socket.emit('updateGame', this.game, this.roomService.currentRoom);
  }

  listenGameChanges(): void {
    this.socket.on('updateGame', (game) => {
      this.game = game;
    });
  }

  getRandomWord(): string {
    const wordPool = [
      'Car',
      'Window',
      'Kid',
      'Human',
      'House',
      'Mountain',
      'Rabbit',
    ];
    return wordPool[Math.floor(Math.random() * wordPool.length)];
  }
}
