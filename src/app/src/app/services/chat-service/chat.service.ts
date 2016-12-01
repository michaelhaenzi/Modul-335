import { Injectable } from '@angular/core';
import {EntityService} from "../entity-service/entity.service";
import {CustomHttpService} from "../custom-http-service/custom-http.service";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class ChatService extends EntityService {

  protected MOUNTPOINT: string = "/chats/";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) {
    super(http);
  }

}
