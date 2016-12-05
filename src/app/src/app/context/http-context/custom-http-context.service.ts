import { Injectable } from '@angular/core';
import {EventsService} from "../../services/events.service";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class CustomHttpContextService {

  public BASEURL: string = "http://api.localhost/api/v1.0/";
  public TOKEN: string = "";

  constructor(private eventsService: EventsService) {

  }

}
