import { Component, OnInit } from '@angular/core';
import { InitializeService } from './shared/services/initialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public initializeService: InitializeService) {}

  ngOnInit(): void {
    this.initializeService.init();
  }
}
