import { Component, OnInit } from '@angular/core';
import {RestList} from "../../../class/rest-list";

@Component({
  selector: 'app-chat-list',
  templateUrl: 'chat-list.component.html',
  styleUrls: ['chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public chatList: RestList;

  constructor() { }

  ngOnInit() {
    this.chatList = new RestList([{"display": "Nicolas Ackermann", "last_message": "Hey wie gehts ?", "time_ago": "28.11.2016 13:37.42", "id": 1},
      {"display": "Wochendend Gruppe", "last_message": "Kann leider nicht", "time_ago": "28.11.2016 13:45.12", "id": 2}
    ]);
  }

}
