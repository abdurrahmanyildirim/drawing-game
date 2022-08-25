import { Component, OnInit } from '@angular/core';
import { MobilDetectionService } from './shared/services/mobile-detection';
import { SocketService } from './shared/services/socket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private mobildDetectionService: MobilDetectionService,
    private socketService: SocketService
  ) {
    this.mobildDetectionService.init();
  }

  ngOnInit(): void {
    this.socketService.connect();
  }
}
