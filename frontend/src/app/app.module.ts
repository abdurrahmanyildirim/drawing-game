import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/component';
import { DrawingTableComponent } from './shared/components/drawing-table/component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LandingComponent } from './pages/landing/component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/component';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewRoomComponent } from './pages/landing/new-room/component';
import { MessageComponent } from './pages/main/message/component';
import { PlayGroundComponent } from './pages/main/play-ground/component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LandingComponent,
    DrawingTableComponent,
    LoginComponent,
    NewRoomComponent,
    MessageComponent,
    PlayGroundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    NgbModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
