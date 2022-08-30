import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    private playerService: PlayerService,
    private router: Router
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
        next: (res: Room) => {
          this.roomService.currentRoom = res;
          this.router.navigateByUrl('');
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
