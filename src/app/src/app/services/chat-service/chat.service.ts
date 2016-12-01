import { Injectable } from '@angular/core';
import {EntityService} from "../entity-service/entity.service";
import {CustomHttpService} from "../custom-http-service/custom-http.service";

@Injectable()
export class ChatService extends EntityService {

  protected MOUNDPOINT: string = "/chats/";

  constructor(protected http: CustomHttpService) {
    super(http);
  }

}
