import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../../services/events.service";
import {UserService} from "../../../services/entity-service/user-service/user.service";
import {ActivatedRoute} from "@angular/router";
import {RestObject} from "../../../class/rest-object";

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
@Component({
  selector: 'app-contact-detail',
  templateUrl: 'contact-detail.component.html',
  styleUrls: ['contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  public restObject: RestObject = new RestObject({});
  public userId: number;
  public loading: boolean = true;
  public weFriends: boolean = false;

  constructor(private eventsService: EventsService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id: number) => {
      this.userId = id;
    });
    this.getSingle();
    this.eventsService.trigger("route:back", true, "contacts", "Laden...", false, "", false, "");
  }

  public addContact(): void {
    this.userService.addContact({id: this.restObject.display('id')}).subscribe(() => {
      this.weFriends = true;
    });
  }

  public changeTitel(): void {
    this.eventsService.trigger("route:back", true, "contacts", this.restObject.display('lastname') + " " + this.restObject.display('firstname'), false);
  }

  /**
   * Holt alle Chats von der REST API
   */
  public getSingle(): void  {
    this.userService.getSingle(this.userId).subscribe((res: RestObject) => {
      this.restObject = res; this.changeTitel();
      if (this.restObject.display('isContact') === "false") {
        this.weFriends = false;
      } else {
        this.weFriends = true;
      }
    }, (err) => {console.log(err), this.loading = false}, () => this.loading = false);
  }

}
