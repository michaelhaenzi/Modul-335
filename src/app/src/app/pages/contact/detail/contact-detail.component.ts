import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../../services/events.service";

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

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.trigger("route:back", true, "contacts", "Ackermann Nicolas");
  }

}
