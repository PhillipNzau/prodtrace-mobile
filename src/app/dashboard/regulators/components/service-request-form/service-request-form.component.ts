import { Component, OnInit } from '@angular/core';
import {slideInModalAnimation} from "../../../../shared/animations";

@Component({
  selector: 'app-service-request-form',
  templateUrl: './service-request-form.component.html',
  styleUrls: ['./service-request-form.component.scss'],
  animations: [slideInModalAnimation]
})
export class ServiceRequestFormComponent implements OnInit {
  isOption: string ='';
  formSent = false;

  constructor() { }

  ngOnInit(): void {
  }

  optionSelected(option: string) {
    this.isOption = option == 'mpesa' ? 'mpesa' : 'other'

  }

  onSendRequest() {
    this.formSent = true;
  }
}
