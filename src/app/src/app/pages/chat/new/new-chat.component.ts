import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/entity-service/chat-service/chat.service";
import {EventsService} from "../../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RestList} from "../../../class/rest-list";
import {RestObject} from "../../../class/rest-object";

@Component({
  selector: 'app-new-chat',
  templateUrl: '../detail/chat-detail.component.html',
  styleUrls: ['../detail/chat-detail.component.css']
})
export class NewChatComponent implements OnInit {

  public restObject: RestList = new RestList([]);
  public userId: string = "";
  public loading: boolean = true;
  public partnerId: number;
  public chatId: number;
  public message: string = "";

  constructor(private chatService: ChatService, private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id: number) => {
      this.partnerId = id;
    });
    this.userId = localStorage.getItem("USER_ID");
    this.eventsService.trigger("route:back", true, "contacts", "Neuer Chat");
  }

  /**
   * Holt den Chat von der REST API
   */
  public getSingle(): void  {
    this.chatService.getMessages(this.chatId).subscribe((res: RestList) => this.restObject = res, (err) => {console.log(err); this.loading = false}, () => this.loading = false);
  }

  public sendMessage(): void {
    this.chatService.sendMessage({text: this.message, partnerId: this.partnerId}).subscribe((res: RestObject) => {
      this.message = "";
      this.router.navigateByUrl("/chats/", res.display('chatId'));
    }, (err) => {
      console.log("Error: ", err);
    });
  }

}
