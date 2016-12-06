import { Injectable } from '@angular/core';
import {EntityService} from "../entity.service";
import {EntityExtendsService} from "../../../interface/service/entity-extends-service";
import {CustomHttpService} from "../../custom-http-service/custom-http.service";
import {Observable} from "rxjs";
import {RestObject} from "../../../class/rest-object";

@Injectable()
export class UserService extends EntityService implements EntityExtendsService {

  public MOUNTPOINT: string = "contact";

  constructor(protected http: CustomHttpService) {
    super(http);
  }

  /**
   * {@inheritDoc}
   */
  public getSingle(id: number): Observable<RestObject> {
    return this.http.getSingle("user" + "/" + id.toString());
  }

  public addContact(body: any): Observable<RestObject> {
    return this.http.postItem(this.MOUNTPOINT, body);
  }

}
