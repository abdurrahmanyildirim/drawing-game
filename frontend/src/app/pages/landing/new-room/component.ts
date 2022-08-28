import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/shared/services/socket';
import { PlayerService } from 'src/app/shared/services/player';
import { RoomService } from '../../../shared/services/room';
import { Router } from '@angular/router';

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
    private socketService: SocketService,
    private playerService: PlayerService,
    private router: Router
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
          this.socketService.emitNewRoom();
          this.roomService.currentRoom = res;
          window.sessionStorage.setItem('room', JSON.stringify(res));
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
