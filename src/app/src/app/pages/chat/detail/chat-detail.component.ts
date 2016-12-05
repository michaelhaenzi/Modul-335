import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/entity-service/chat-service/chat.service";
import {EventsService} from "../../../services/events.service";
import {RestList} from "../../../class/rest-list";
import {ActivatedRoute} from "@angular/router";
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

  public restObject: RestList = new RestList([]);
  public userId: string = "";
  public loading: boolean = true;
  public chatId: number;
  public message: string = "";

  constructor(private chatService: ChatService, private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id: number) => {
      this.chatId = id;
    });
    this.userId = localStorage.getItem("USER_ID");
    this.getSingle();
    this.eventsService.trigger("route:back", true, "chats", "Ackermann Nicolas");
  }

  /**
   * Holt den Chat von der REST API
   */
  public getSingle(): void  {
    this.chatService.getMessages(this.chatId).subscribe((res: RestList) => this.restObject = res, (err) => {console.log(err); this.loading = false}, () => this.loading = false);
  }

  public sendMessage(): void {
    this.chatService.sendMessage({chatId: this.chatId, text: this.message}).subscribe((res: RestObject) => {
      this.message = "";
      console.log("A: ", res);
    }, (err) => {
      console.log("B: ", err);
    });
}

}
