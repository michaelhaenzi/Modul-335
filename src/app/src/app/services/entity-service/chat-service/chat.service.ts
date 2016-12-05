import { Injectable } from '@angular/core';
import {EntityService} from "../entity.service";
import {CustomHttpService} from "../../custom-http-service/custom-http.service";
import {EntityExtendsService} from "../../../interface/service/entity-extends-service";
import {Observable} from "rxjs";
import {RestList} from "../../../class/rest-list";
import {RestObject} from "../../../class/rest-object";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class ChatService extends EntityService implements EntityExtendsService {

  public MOUNTPOINT: string = "chat";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) {
    super(http);
  }

  /**
   * holt Nachrichten
   */
  public getMessages(id: number): Observable<RestList> {
    return this.http.getList(this.MOUNTPOINT + "/" + id.toString());
  }

  /**
   * sendet Nachricht
   */
  public sendMessage(body: Object): Observable<RestObject> {
    return this.http.postItem("message", body);
  }

}
