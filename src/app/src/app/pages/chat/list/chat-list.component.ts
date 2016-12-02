import { Component, OnInit } from '@angular/core';
import {RestList} from "../../../class/rest-list";
import {ChatService} from "../../../services/entity-service/chat-service/chat.service";
import 'rxjs/Rx';
import {Http} from "@angular/http";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Component({
  selector: 'app-chat-list',
  templateUrl: 'chat-list.component.html',
  styleUrls: ['chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public chatList: RestList;

  constructor(private chatService: ChatService, private http: Http) { }

  ngOnInit() {
    this.getList();
    /*this.chatList = new RestList([{"display": "Nicolas Ackermann", "last_message": "Hey wie gehts ?", "time_ago": "28.11.2016 13:37.42", "id": 1},
      {"display": "Wochendend Gruppe", "last_message": "Kann leider nicht", "time_ago": "28.11.2016 13:45.12", "id": 2}
    ]);*/
  }

  /**
   * Holt alle Chats von der REST API
   */
  public getList(): void  {
    //this.chatService.getList().subscribe((res: RestList) => this.chatList = res);
  }

}
