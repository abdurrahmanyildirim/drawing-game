import { Component } from '@angular/core';
import { MobilDetectionService } from './shared/services/mobile-detection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private mobildDetectionService: MobilDetectionService) {
    this.mobildDetectionService.init();
  }
}
