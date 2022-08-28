import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, throttleTime } from 'rxjs';
import { DrawingService } from 'src/app/shared/services/drawing-service';
import { SocketService } from 'src/app/shared/services/socket';
import * as LZUTF8 from 'lzutf8';
import { RoomService } from 'src/app/shared/services/room';

@Component({
  selector: 'app-main',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  drawedImg = '';
  imgListener: Subscription;
  constructor(
    private socketService: SocketService,
    private drawingService: DrawingService,
    public roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.imgListener = this.socketService
      .onDrawing()
      .pipe(throttleTime(300))
      .subscribe({
        next: (newDrawing: any) => {
          const decompressedPng = LZUTF8.decompress(newDrawing, {
            inputEncoding: 'Base64',
          });
          this.drawedImg = decompressedPng;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.imgListener) {
      this.imgListener.unsubscribe();
    }
  }
}
