import { Component } from '@angular/core';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ui';

  constructor(public connectionService: ConnectionService) {}
}
