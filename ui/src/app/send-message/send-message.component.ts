import { Component, OnInit } from '@angular/core';
import { SendMessagesService } from '../services/send-messages.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  sendTo = '';
  message = '';
  options = ['Group', 'Users'];
  groupName = '';
  setGroupMessage(value: string) {
    this.groupName = value;
  }
  constructor(private sendMessagesService: SendMessagesService) {}

  ngOnInit(): void {}
  Send() {
    if (this.sendTo === 'Group') {
      if (this.groupName) {
        this.sendMessagesService.sendMessageToGroup(
          this.message,
          this.groupName
        );
      } else {
        console.log('Insira um grupo');
      }
    }
  }
}
