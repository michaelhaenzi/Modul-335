import { Component, OnInit } from '@angular/core';
import {RestList} from "../../../class/rest-list";
import {EventsService} from "../../../services/events.service";
import {UserService} from "../../../services/entity-service/user-service/user.service";

@Component({
  selector: 'app-user-search',
  templateUrl: 'user-search.component.html',
  styleUrls: ['user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  public restList: RestList = new RestList([]);
  public loading: boolean = true;

  constructor(private eventsService: EventsService, private userService: UserService) { }

  ngOnInit() {
    this.getList();
    this.eventsService.trigger("route:back", false, "", "Kontakte", false);
  }

  /**
   * Holt alle Chats von der REST API
   */
  public getList(): void  {
    this.userService.getList().subscribe((res: RestList) => this.restList = res, (err) => {console.log(err), this.loading = false}, () => this.loading = false);
  }

}
