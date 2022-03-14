import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JoinGroupComponent } from './join-group/join-group.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { SingleChatComponent } from './single-chat/single-chat.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, JoinGroupComponent, SendMessageComponent, BroadcastComponent, SingleChatComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
