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
  options = ['All', 'Groups', 'Users'];
  constructor(public chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.connect();
  }
  Send() {
    if (this.sendTo === 'All') {
      console.log(this.message);
      this.chatService.sendMessageToHub(this.message);
    }
  }
}
