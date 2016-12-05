import { Component, OnInit } from '@angular/core';
import {RestList} from "../../../class/rest-list";
import {ChatService} from "../../../services/entity-service/chat-service/chat.service";
import 'rxjs/Rx';
import {Http} from "@angular/http";
import {EventsService} from "../../../services/events.service";

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

  public chatList: RestList = new RestList([]);
  public loading: boolean = true;

  constructor(private chatService: ChatService, private http: Http, private eventsService: EventsService) { }

  ngOnInit() {
    this.getList();
    this.eventsService.trigger("route:back", false, "", "Chats", false);
  }

  /**
   * Holt alle Chats von der REST API
   */
  public getList(): void  {
    this.chatService.getList().subscribe((res: RestList) => this.chatList = res, (err) => {console.log(err), this.loading = false}, () => this.loading = false);
  }

}
