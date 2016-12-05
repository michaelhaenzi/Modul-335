import { Injectable } from '@angular/core';
import {EntityExtendsService} from "../../../interface/service/entity-extends-service";
import {EntityService} from "../entity.service";
import {CustomHttpService} from "../../custom-http-service/custom-http.service";

@Injectable()
export class SettingsService extends EntityService implements EntityExtendsService {

  public MOUNTPOINT: string = "settings";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) {
    super(http);
  }

}
