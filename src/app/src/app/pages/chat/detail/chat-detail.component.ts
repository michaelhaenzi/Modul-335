import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from "../../../services/entity-service/chat-service/chat.service";
import {EventsService} from "../../../services/events.service";
import {RestList} from "../../../class/rest-list";
import {ActivatedRoute} from "@angular/router";
import {RestObject} from "../../../class/rest-object";
import {Observable, Subscription} from "rxjs";
import {Subscribable} from "rxjs/Observable";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit, OnDestroy {
  public restObject: RestList = new RestList([]);
  public userId: string = "";
  public loading: boolean = true;
  public chatId: number;
  public message: string = "";
  public timerSub: Subscription;
  private timer;

  constructor(private chatService: ChatService, private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id: number) => {
      this.chatId = id;
    });
    this.timer = Observable.timer(2000, 2000);
    this.timerSub = this.timer.subscribe(t => this.getSingle());
    this.userId = localStorage.getItem("USER_ID");
    this.getSingle();
    this.getChat();
    this.eventsService.trigger("route:back", true, "chats", "Lade...", false, "", false, "");
  }

  ngOnDestroy(): void {
    this.timerSub.unsubscribe();
  }


  /**
   * Holt den Chat von der REST API
   */
  public getSingle(): void  {
    this.chatService.getMessages(this.chatId).subscribe((res: RestList) => this.restObject = res, (err) => {console.log(err); this.loading = false}, () => this.loading = false);
  }
  public getChat(): void {
    this.chatService.getSingle(this.chatId).subscribe((res: RestObject) => this.eventsService.trigger("route:back", true, "chats", res.display('lastname') + " " + res.display('firstname'), false, "", true, "contacts/" + res.display('id')));
  }

  public sendMessage(): void {
    this.restObject.items.push(new RestObject({userId: this.userId, text: this.message}));
    this.chatService.sendMessage({chatId: this.chatId, text: this.message}).subscribe((res: RestObject) => {
      this.message = "";
    }, (err) => {
      console.log(err);
    });
  }

}
