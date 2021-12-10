import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { ChatMessage } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private connectionService: ConnectionService) {}
  public buildChatMessage(message: string, roomName?: string): ChatMessage {
    return {
      connectionId: this.connectionService.hubConnection.connectionId!,
      text: message,
      dateTime: new Date(),
      roomName: roomName,
    };
  }
}
