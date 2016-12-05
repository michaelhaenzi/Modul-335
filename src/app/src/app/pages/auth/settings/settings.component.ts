import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../../services/events.service";

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.trigger("route:back", false, "", "Einstellungen");
  }

}
