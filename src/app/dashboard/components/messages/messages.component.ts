import {Component, OnInit} from '@angular/core';
import {ChatEntityService} from "../../farms/services/chat/chat-entity.service";
import {ChatModel} from "../../farms/types/chatInterface";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  chats: ChatModel | any;

  constructor(private chatService: ChatEntityService) {
  }

  ngOnInit() {
    this.getChats()
  }

  //// Get all the chats
  getChats() {
    this.chatService.entities$.subscribe({
      next: (data: ChatModel[]) => {
        this.chats = data
        console.log('da', this.chats)
      },
      error: (error) => {
        console.log('err', error)
      }
    })
  }

}
