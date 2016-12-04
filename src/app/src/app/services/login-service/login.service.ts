import { Injectable } from '@angular/core';
import {AuthService} from "../auth-service/auth.service";
import {RestObject} from "../../class/rest-object";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class LoginService {

  constructor(private authService: AuthService) { }

  /**
   * Führt einen Login über den AuthService aus
   *
   * @param form
   */
  public doLogin(loginBody: any): Observable<any> {
    return this.authService.doLogin(loginBody);
  }

}
