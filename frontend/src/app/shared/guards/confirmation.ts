import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class ConfirmationGuard implements CanDeactivate<any> {
  constructor() {}

  canDeactivate(component: any): boolean {
    // if (component.ifAllowed) {
    var ans = confirm('Do you want to save this data?');
    console.log({ ans });
    if (ans == true) {
      return true;
    } else {
      return false;
    }
    // }
    return true;
  }
}
