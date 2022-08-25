import { Component, OnInit } from '@angular/core';
import { throttleTime } from 'rxjs';
import { DrawingService } from 'src/app/shared/services/drawing-service';
import { SocketService } from 'src/app/shared/services/socket';
import * as LZUTF8 from 'lzutf8';

@Component({
  selector: 'app-main',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class MainComponent implements OnInit {
  drawedImg = '';
  constructor(
    private socketService: SocketService,
    private drawingService: DrawingService
  ) {}

  ngOnInit(): void {
    this.socketService
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
}
