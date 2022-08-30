import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message';
import { Message } from 'src/app/shared/services/message/model';
import { PlayerService } from 'src/app/shared/services/player';
import { RoomService } from 'src/app/shared/services/room';

@Component({
  selector: 'app-message',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class MessageComponent implements OnInit, OnDestroy {
  msg = '';
  messages: Message[] = [];
  msgStreamListener: Subscription;

  constructor(
    public messageService: MessageService,
    private roomService: RoomService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    console.log(this.messages);
    this.messageService.listenNewMessage();
    this.msgStreamListener = this.messageService.msgStream.subscribe({
      next: (msg: Message) => {
        this.messages.push(msg);
      },
    });
  }

  sendMessage(): void {
    if (this.msg.trim().length <= 0) {
      return;
    }
    const msg = this.getMsg();
    this.messageService.send(msg, this.roomService.currentRoom);
    this.msg = '';
  }

  private getMsg(): Message {
    return {
      msg: this.msg,
      date: new Date(),
      sender: {
        id: this.playerService.player.id,
        name: this.playerService.player.name,
      },
    };
  }

  ngOnDestroy(): void {
    if (this.msgStreamListener) {
      this.msgStreamListener.unsubscribe();
    }
  }
}
