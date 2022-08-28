import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/shared/services/player';
import { RoomService } from 'src/app/shared/services/room';
import { Room } from 'src/app/shared/services/room/model';
import { NewRoomComponent } from './new-room/component';

@Component({
  selector: 'app-landing',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class LandingComponent implements OnInit, OnDestroy {
  drawedImg = '';
  subs = new Subscription();

  constructor(
    public roomService: RoomService,
    private modalService: NgbModal,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {}

  createRoom(): void {
    this.modalService
      .open(NewRoomComponent, {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          console.log('Room Created');
        },
        (reason) => {}
      );
  }

  joinRoom(room: Room): void {
    const sub = this.roomService
      .joinRoom(this.playerService.player, room)
      .subscribe({
        next: (res) => {
          // TODO : Inform other clients for new user and update their room data and navigate current user to main route.
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
