import { Player } from '../player/model';

export interface Room {
  id?: string;
  hasPassword: boolean;
  password?: string;
  name: string;
  date?: Date;
  owner: Player;
  players?: Player[];
}
