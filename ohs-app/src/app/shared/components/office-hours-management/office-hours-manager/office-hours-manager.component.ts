import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ohs-office-hours-manager',
  templateUrl: './office-hours-manager.component.html',
  styleUrls: ['./office-hours-manager.component.scss']
})
export class OfficeHoursManagerComponent implements OnInit {
  @Input() officeHourBlocks: [];
  @Input() displayPage: string;

  constructor() { }

  ngOnInit() {
  }

}
