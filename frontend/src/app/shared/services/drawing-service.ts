import { ElementRef, Injectable } from '@angular/core';
import { auditTime, BehaviorSubject } from 'rxjs';
import { MobilDetectionService } from './mobile-detection';
import * as LZUTF8 from 'lzutf8';
import { SocketService } from './socket';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  content = null;
  painting = false;
  currentColor = 'black';
  lineCap: CanvasLineCap = 'round';
  lineWidth = 5;
  replacementY = 23;
  replacementX = 0;

  drawingListener = new BehaviorSubject(new Uint8Array());

  constructor(
    private mobileDetectionService: MobilDetectionService,
    private socketService: SocketService
  ) {}

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas;
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  resizeCanvas(): void {
    this.content = this.getCurrentDrawing();
    const canvasContainer = document.getElementById('canvas-container');
    this.canvas.nativeElement.width = canvasContainer.clientWidth;
    this.canvas.nativeElement.height = canvasContainer.clientHeight;
    this.context.putImageData(this.content, 0, 0);
  }

  getCurrentDrawing(): ImageData {
    return this.context.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  draw(e: MouseEvent | TouchEvent): void {
    if (!this.painting) {
      return;
    }
    let clientX =
      e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
    let clientY =
      e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY;

    if (!this.mobileDetectionService.isMobile) {
      clientX += this.replacementX;
      clientY += this.replacementY;
    }
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = this.lineCap;
    this.context.strokeStyle = this.currentColor;
    this.context.lineTo(clientX, clientY);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(clientX, clientY);
  }

  startPosition(event: any): void {
    this.painting = true;
    this.draw(event);
  }

  updateStream(): void {
    const canvasContent = this.canvas.nativeElement.toDataURL();
    const bufferedContent = LZUTF8.compress(canvasContent, {
      outputEncoding: 'Base64',
    });
    this.socketService.emitDrawing(bufferedContent);
  }

  finishedPosition(): void {
    this.painting = false;
    this.context.beginPath();
    this.updateStream();
  }

  activateEraser(): void {
    this.replacementY = 20;
    this.replacementX = 3;
    this.lineWidth = 10;
    this.currentColor = 'white';
    this.lineCap = 'square';
    this.canvas.nativeElement.style.cursor =
      'url("../assets/eraser.png"), auto';
  }

  activatePencil(): void {
    this.replacementY = 23;
    this.replacementX = 0;
    this.lineWidth = 5;
    this.currentColor = 'black';
    this.lineCap = 'round';
    this.canvas.nativeElement.style.cursor =
      'url("../assets/pencil.png"), auto';
  }

  changeColor(event: Event): void {
    this.currentColor = (event.target as any).value;
  }

  download(): void {
    var lnk = document.createElement('a');
    lnk.download = 'myDraw';
    lnk.href = this.canvas.nativeElement.toDataURL('image/png;base64');
    lnk.click();
    lnk.remove();
  }

  clean(): void {
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.updateStream();
  }
}
