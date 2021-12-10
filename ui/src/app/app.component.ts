import { SendMessagesService } from './services/send-messages.service';
import { Component } from '@angular/core';
import { ConnectionService } from './services/connection.service';
import { GroupControlService } from './services/group-control.service';

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
  constructor(
    public chatService: ConnectionService,
    private sendMessagesService: SendMessagesService,
    private groupControlService: GroupControlService
  ) {}
  ngOnInit(): void {
    this.chatService.connect();
  }
  Send() {
    if (this.sendTo === 'All') {
      console.log(this.message);
      this.sendMessagesService.sendMessageToHub(this.message);
    } else if (this.sendTo === 'Group') {
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
  JoinGroup() {
    this.groupControlService.getInAGroup(this.groupName);
  }
}
