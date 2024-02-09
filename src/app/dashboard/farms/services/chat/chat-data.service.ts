import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {CropInterface} from "../../types/cropInterface";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ChatModel, ChatResModel} from "../../types/chatInterface";

@Injectable({
  providedIn: 'root'
})
export class ChatDataService extends DefaultDataService<any> {
  listChatsUrl = environment.listChats;
  createChatUrl = environment.createChat;
  unRepliedChatUrl = environment.unRepliedChats;
  unReadResponseUrl = environment.unReadResponse

  constructor(http: HttpClient, httpUrlGenerator:HttpUrlGenerator) {
    super('Chat', http, httpUrlGenerator);
  }

  override getAll(): Observable<any> {
    return this.http.get<ChatResModel>(this.listChatsUrl).pipe(
      map((chats: ChatResModel) => {
        return chats.results
      })
    )
  }

  override add(chat: ChatModel): Observable<any> {
    return this.http.post<any>(this.listChatsUrl, chat).pipe(
      map((chats: ChatModel) => {
        return chats
      })
    )
  }


}
