import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ChatDataService} from "../../farms/services/chat/chat-data.service";
import {ChatEntityService} from "../../farms/services/chat/chat-entity.service";
import {NotificationService} from "../../../shared/service/notification.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  chatForm = this.fb.group({
    title: ['', Validators.required],
    message: ['', Validators.required]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private chatService: ChatEntityService,
    private notificationService: NotificationService,

    ) { }

  ngOnInit(): void {
  }


  chatSubmit() {
    const chatData = {
      title: this.chatForm.value.title,
      message: this.chatForm.value.message
    }
    this.chatService.add(chatData).subscribe({
      next: (chats:any) => {
        this.chatForm.reset();
        this.notificationService.showNotification('Message sent successfully',
          'success');

      },
      error: (err) => {
        this.notificationService.showNotification('Something went wrong sending message',
          'error');

        console.log(err);
      }
    })

  }
}
