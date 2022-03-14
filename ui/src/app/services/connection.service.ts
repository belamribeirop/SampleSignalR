import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  public hubConnection: HubConnection;
  public messages: ChatMessage[] = [];
  public username: string = '';
  private connectionUrl = `https://localhost:5001/chatHub?username=${this.username}`;

  constructor(private http: HttpClient) {}

  public connect = (username: string) => {
    this.username = username;
    this.startConnection();
    this.addListeners();
  };

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
