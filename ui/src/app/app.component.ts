import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ui';
  sendTo = '';
  message = '';
  options = ['All', 'Group', 'Users'];
  groupName = '';
  constructor(public chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.connect();
  }
  Send() {
    if (this.sendTo === 'All') {
      console.log(this.message);
      this.chatService.sendMessageToHub(this.message);
    } else if (this.sendTo === 'Group') {
      if (this.groupName) {
        this.chatService.sendMessageToGroup(this.message, this.groupName);
      } else {
        console.log('Insira um grupo');
      }
    }
  }
  JoinGroup() {
    this.chatService.getInAGroup(this.groupName);
  }
}
