import { Component, ElementRef, ViewChild } from '@angular/core';
import { DrawingService } from '../../services/drawing-table';

@Component({
  selector: 'app-drawing-table',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class DrawingTableComponent {
  @ViewChild('myCanvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor(private drawingService: DrawingService) {}

  ngAfterViewInit(): void {
    this.drawingService.init(this.canvas);
    window.addEventListener('resize', () => {
      this.drawingService.resizeCanvas();
    });
    this.drawingService.resizeCanvas();
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
}
