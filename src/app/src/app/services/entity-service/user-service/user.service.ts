import { Injectable } from '@angular/core';
import {EntityService} from "../entity.service";
import {EntityExtendsService} from "../../../interface/service/entity-extends-service";
import {CustomHttpService} from "../../custom-http-service/custom-http.service";

@Injectable()
export class UserService extends EntityService implements EntityExtendsService {

  public MOUNTPOINT: string = "contact";

  constructor(protected http: CustomHttpService) {
    super(http);
  }

}
