import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class GroupControlService {
  constructor(private connectionService: ConnectionService) {}
  public getInAGroup(groupName: string) {
    var promise = this.connectionService.hubConnection
      .invoke('JoinRoom', {
        groupName: groupName,
        connectionId: this.connectionService.hubConnection.connectionId,
      })
      .then(() => {
        console.log('Joined to Group');
      })
      .catch((err: Error) =>
        console.log('error while join to a group: ' + err)
      );
  }
}
