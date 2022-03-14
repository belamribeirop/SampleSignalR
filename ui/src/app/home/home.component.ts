import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username = '';
  connected = false;

  constructor(public chatService: ConnectionService, private router: Router) {}
  ngOnInit(): void {
    this.connected = false;
  }
  sendMessageToAll() {
    this.router.navigate(['broadcast']);
  }
  sendMessageToOneUser() {
    this.router.navigate(['chat']);
  }
  connectOnTheServer() {
    this.chatService.connect(this.username);
    this.connected = true;
  }
}
