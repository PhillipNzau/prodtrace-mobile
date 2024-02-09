import { Component, OnInit } from '@angular/core';
import {slideInAnimation} from "../../../shared/animations";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [slideInAnimation]
})
export class NotificationsComponent implements OnInit {
  isOpened = false;
  constructor() { }

  ngOnInit(): void {
  }

  isOpen() {
    this.isOpened = !this.isOpened
  }
}
