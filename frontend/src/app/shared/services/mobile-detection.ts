import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobilDetectionService {
  isMobile: boolean;
  mediaQuery = window.matchMedia('(hover:none)');

  init(): void {
    this.isMobile = this.mediaQuery.matches;
  }
}
