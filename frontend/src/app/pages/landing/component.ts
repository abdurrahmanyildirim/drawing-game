import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/shared/services/room';
import { NewRoomComponent } from './new-room/component';

@Component({
  selector: 'app-landing',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class LandingComponent implements OnInit {
  drawedImg = '';
  rooms: [];

  constructor(
    private roomService: RoomService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initRooms();
  }

  initRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        console.log(rooms);
      },
    });
  }

  createRoom() {
    this.modalService
      .open(NewRoomComponent, {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
