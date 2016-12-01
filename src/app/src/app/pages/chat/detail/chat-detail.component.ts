import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat-service/chat.service";
import {RestObject} from "../../../class/rest-object";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {

  public restObject: RestObject;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  public getSingle(): void  {
    this.chatService.getSingle(1).map((res: RestObject) => this.restObject = res);
  }

}
