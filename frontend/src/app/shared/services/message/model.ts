import { Player } from '../player/model';

export interface Message {
  sender: {
    id: string;
    name: string;
  };
  msg: string;
  date: Date;
}
