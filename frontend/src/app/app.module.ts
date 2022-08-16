import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/component';
import { DrawingTableComponent } from './shared/components/drawing-table/component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './shared/services/socket';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [AppComponent, MainComponent, DrawingTableComponent],
  imports: [BrowserModule, AppRoutingModule, SocketIoModule.forRoot(config)],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
