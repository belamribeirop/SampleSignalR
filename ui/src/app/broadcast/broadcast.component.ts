import { Component, OnInit } from '@angular/core';
import { SendMessagesService } from '../services/send-messages.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss'],
})
export class BroadcastComponent implements OnInit {
  message = '';
  constructor(private sendMessagesService: SendMessagesService) {}

  ngOnInit(): void {}
  SendBroadcast() {
    this.sendMessagesService.sendBroadcastMessage(this.message);
  }
}
