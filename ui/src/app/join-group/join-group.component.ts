import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GroupControlService } from '../services/group-control.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss'],
})
export class JoinGroupComponent implements OnInit {
  groupName = '';
  @Output() sendGroup = new EventEmitter<string>();
  constructor(private groupControlService: GroupControlService) {}

  ngOnInit(): void {}
  JoinGroup() {
    this.groupControlService.getInAGroup(this.groupName);
    this.sendGroup.emit(this.groupName);
  }
}
