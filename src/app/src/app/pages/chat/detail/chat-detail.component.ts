import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/entity-service/chat-service/chat.service";
import {RestObject} from "../../../class/rest-object";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {

  public restObject: RestObject;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    //this.getSingle();
  }

  /**
   * Holt den Chat von der REST API
   */
  public getSingle(): void  {
    //this.chatService.getSingle(1).subscribe((res: RestObject) => this.restObject = res);
  }

}