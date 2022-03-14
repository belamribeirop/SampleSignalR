import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ConnectionService } from './connection.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class SendMessagesService {
  constructor(
    private connectionService: ConnectionService,
    private messagesService: MessagesService
  ) {}
  public sendBroadcastMessage(message: string) {
    console.log(message);
    var promise = this.connectionService.hubConnection
      .invoke('BroadcastAsync', this.messagesService.buildChatMessage(message))
      .then(() => {
        console.log('message sent successfully to hub');
      })
      .catch((err: Error) =>
        console.log('error while sending a message to hub: ' + err)
      );

    return from(promise);
  }
  public sendMessageToGroup(message: string, roomName: string) {
    console.log(message);
    var promise = this.connectionService.hubConnection
      .invoke(
        'GroupAsync',
        this.messagesService.buildChatMessage(message, roomName)
      )
      .then(() => {
        console.log('group message sent successfully to hub');
      })
      .catch((err: Error) =>
        console.log('error while sending a message to hub: ' + err)
      );

    return from(promise);
  }
}
