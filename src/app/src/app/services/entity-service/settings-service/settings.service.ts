import { Injectable } from '@angular/core';
import {EntityExtendsService} from "../../../interface/service/entity-extends-service";
import {EntityService} from "../entity.service";
import {CustomHttpService} from "../../custom-http-service/custom-http.service";
import {RestObject} from "../../../class/rest-object";
import {Observable} from "rxjs";

@Injectable()
export class SettingsService extends EntityService implements EntityExtendsService {

  public MOUNTPOINT: string = "setting";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) {
    super(http);
  }

  /**
   * {@inheritDoc}
   */
  public put(body: Object): Observable<RestObject> {
    return this.http.putItem(this.MOUNTPOINT, body);
  }

  /**
   * {@inheritDoc}
   */
  public get(): Observable<RestObject> {
    return this.http.getSingle(this.MOUNTPOINT);
  }

}
