import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { from } from 'rxjs';
import { ChatMessage } from './types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: HubConnection;
  public messages: ChatMessage[] = [];
  private connectionUrl = 'https://localhost:5001/signalr';

  constructor(private http: HttpClient) {}

  public connect = () => {
    this.startConnection();
    this.addListeners();
  };
  private buildChatMessage(message: string, roomName?: string): ChatMessage {
    return {
      connectionId: this.hubConnection.connectionId!,
      text: message,
      dateTime: new Date(),
      roomName: roomName,
    };
  }
  public sendMessageToHub(message: string) {
    console.log(message);
    var promise = this.hubConnection
      .invoke('BroadcastAsync', this.buildChatMessage(message))
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
    var promise = this.hubConnection
      .invoke('GroupAsync', this.buildChatMessage(message, roomName))
      .then(() => {
        console.log('group message sent successfully to hub');
      })
      .catch((err: Error) =>
        console.log('error while sending a message to hub: ' + err)
      );

    return from(promise);
  }
  public getInAGroup(groupName: string) {
    var promise = this.hubConnection
      .invoke('JoinRoom', {
        groupName: groupName,
        connectionId: this.hubConnection.connectionId,
      })
      .then(() => {
        console.log('Joined to Group');
      })
      .catch((err: Error) =>
        console.log('error while join to a group: ' + err)
      );
  }

  private getConnection(): HubConnection {
    return (
      new HubConnectionBuilder()
        .withUrl(this.connectionUrl)
        //.withHubProtocol(new MessagePackHubProtocol())
        //  .configureLogging(LogLevel.Trace)
        .build()
    );
  }
  startConnection() {
    this.hubConnection = this.getConnection();
    this.hubConnection
      .start()
      .then(() => console.log('Connected!'))
      .catch((error: Error) =>
        console.log('Error while establishing signalR connection', error)
      );
  }
  addListeners() {
    this.hubConnection.on('BroadcastMessage', (data: ChatMessage) => {
      console.log('message received from API Controller');
      this.messages.unshift(data);
      console.log(this.messages);
    });
    this.hubConnection.on('GroupMessage', (data: ChatMessage) => {
      console.log('message received from API Controller');
      this.messages.unshift(data);
      console.log(this.messages);
    });
    this.hubConnection.on('BroadcastAsync', (data: string) => {
      console.log(data);
    });
    this.hubConnection.on('newUserConnected', () => {
      console.log('new user connected');
    });
  }
}
