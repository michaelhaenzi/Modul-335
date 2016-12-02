import { Injectable } from '@angular/core';
import {EntityService} from "../entity.service";
import {CustomHttpService} from "../../custom-http-service/custom-http.service";
import {EntityExtendsService} from "../../../interface/service/entity-extends-service";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class ChatService extends EntityService implements EntityExtendsService {

  public MOUNTPOINT: string = "chats";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) {
    super(http);
  }

}
