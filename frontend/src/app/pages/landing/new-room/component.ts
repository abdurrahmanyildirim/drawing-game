import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from '../../../shared/services/room';

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

  // get hasPassword(): boolean {
  //   return !this.hasPassword;
  // }

  // set hasPassword(val: boolean) {
  //   this.hasPassword = !val;
  // }

  constructor(
    public activeModal: NgbActiveModal,
    private roomService: RoomService
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
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.activeModal.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    // TODO: Create a room after succesful result close modal
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
