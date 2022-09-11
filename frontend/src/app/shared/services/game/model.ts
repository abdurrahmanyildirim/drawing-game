import { Player } from '../player/model';

export interface Game {
  currentPlayer?: Player;
  word?: string;
  status: GameStatus;
  drawTime: number;
  breakTime: number;
  // status:
}

export enum GameStatus {
  Inactive = 'inactive',
  Playing = 'playing',
  RoundBreak = 'roundBreak',
  End = 'end',
}
