import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../../services/events.service";
import {SettingsService} from "../../../services/entity-service/settings-service/settings.service";
import {RestObject} from "../../../class/rest-object";

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

  public messageMe: boolean = false;

  constructor(private eventsService: EventsService, private settingsService: SettingsService) { }

  ngOnInit() {
    this.eventsService.trigger("route:back", false, "", "Einstellungen", false);
    this.settingsService.get().subscribe((res: RestObject) => {
      this.messageMe = JSON.parse(res.display('notification'));
    })
  }

  public saveSettings(): void {
    this.settingsService.put({notification: this.messageMe}).subscribe();
  }

}
