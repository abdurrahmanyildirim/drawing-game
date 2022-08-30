import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerService } from 'src/app/shared/services/player';
import { RoomService } from '../../../shared/services/room';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/services/session-storage';
import { SessionKey } from 'src/app/shared/services/session-storage/model';

@Component({
  selector: 'app-new-room',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class NewRoomComponent {
  name = '';
  password = '';
  hasPassword = false;
  areInputsValid = false;

  constructor(
    public activeModal: NgbActiveModal,
    private roomService: RoomService,
    private playerService: PlayerService,
    private router: Router,
    private sessionService: SessionStorageService
  ) {}

  createNewRoom(): void {
    if (!this.validateInputs()) {
      return;
    }
    this.roomService
      .createRoom({
        name: this.name,
        password: this.password,
        hasPassword: this.hasPassword,
        owner: this.playerService.player,
      })
      .subscribe({
        next: (res) => {
          this.roomService.emitNewRoom(res);
          this.roomService.currentRoom = res;
          this.sessionService.setItem(SessionKey.Room, res);
          this.activeModal.close();
          this.router.navigateByUrl('');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onPasswordChange(): void {
    this.areInputsValid = this.validateInputs();
  }

  onNameChange(): void {
    this.areInputsValid = this.validateInputs();
  }

  onHasPasswordChange(): void {
    this.areInputsValid = this.validateInputs();
  }

  validateInputs(): boolean {
    if (this.name.trim().length <= 0) {
      return false;
    }
    if (this.password.trim().length <= 0 && this.hasPassword) {
      return false;
    }
    return true;
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
