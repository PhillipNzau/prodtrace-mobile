import {Component, OnInit} from '@angular/core';
import {ChatEntityService} from "../../farms/services/chat/chat-entity.service";
import {ChatModel} from "../../farms/types/chatInterface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-selected-messages',
  templateUrl: './selected-messages.component.html',
  styleUrls: ['./selected-messages.component.scss']
})
export class SelectedMessagesComponent implements OnInit {
  items = [1,2,3,45,5,6,8,56,484,4848,8484,545]
  messages: ChatModel | any;
  messageId!: string

  constructor(
    private chatService: ChatEntityService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.messageId = this.route.snapshot.params['id'];
    this.getChats()
  }

  //// Get the messages and filter for the selected message
  getChats(){
    this.chatService.entities$.subscribe({
      next: (data) => {
        console.log('mess', data)

       this.messages = data.filter((message: any) => {
         return message.id == this.messageId;
       })
        console.log('mess', this.messages)

      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
