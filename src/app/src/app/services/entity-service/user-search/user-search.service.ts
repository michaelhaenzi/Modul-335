import { Injectable } from '@angular/core';
import {EntityService} from "../entity.service";
import {EntityExtendsService} from "../../../interface/service/entity-extends-service";
import {CustomHttpService} from "../../custom-http-service/custom-http.service";

@Injectable()
export class UserSearchService extends EntityService implements EntityExtendsService {

  public MOUNTPOINT: string = "user";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) {
    super(http);
  }

}
