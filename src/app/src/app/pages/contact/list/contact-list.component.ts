import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../../services/events.service";
import {RestList} from "../../../class/rest-list";
import {UserService} from "../../../services/entity-service/user-service/user.service";

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
@Component({
  selector: 'app-contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public restList: RestList = new RestList([]);
  public loading: boolean = true;

  constructor(private eventsService: EventsService, private userService: UserService) { }

  ngOnInit() {
    this.getList();
    this.eventsService.trigger("route:back", false, "", "Kontakte", true);
  }

  /**
   * Holt alle Chats von der REST API
   */
  public getList(): void  {
    this.userService.getList().subscribe((res: RestList) => this.restList = res, (err) => {console.log(err), this.loading = false}, () => this.loading = false);
  }

}
