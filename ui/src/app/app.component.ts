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

  constructor(public chatService: ConnectionService) {}
  ngOnInit(): void {
    this.chatService.connect();
  }
}
