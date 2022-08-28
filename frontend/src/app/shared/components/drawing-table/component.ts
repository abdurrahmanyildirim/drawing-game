import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { auditTime, fromEvent, Subscription } from 'rxjs';
import { DrawingService } from '../../services/drawing-service';

@Component({
  selector: 'app-drawing-table',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class DrawingTableComponent implements OnDestroy {
  @ViewChild('myCanvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasContainer') canvasContainer: ElementRef<HTMLElement>;
  resizeListener: Subscription;

  constructor(private drawingService: DrawingService) {}

  ngAfterViewInit(): void {
    this.drawingService.init(this.canvas);
    this.resizeListener = fromEvent(window, 'resize')
      .pipe(auditTime(200))
      .subscribe(() => {
        this.drawingService.resizeCanvas(this.canvasContainer.nativeElement);
      });
    this.drawingService.resizeCanvas(this.canvasContainer.nativeElement);
  }

  draw(event: MouseEvent | TouchEvent): void {
    this.drawingService.draw(event);
  }

  startPosition(event: any): void {
    this.drawingService.startPosition(event);
  }

  finishedPosition(): void {
    this.drawingService.finishedPosition();
  }

  activateEraser(): void {
    this.drawingService.activateEraser();
  }

  activatePencil(): void {
    this.drawingService.activatePencil();
  }

  onColorChange(event: Event): void {
    this.drawingService.changeColor(event);
  }

  download(): void {
    this.drawingService.download();
  }

  clean(): void {
    this.drawingService.clean();
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener.unsubscribe();
    }
  }
}
