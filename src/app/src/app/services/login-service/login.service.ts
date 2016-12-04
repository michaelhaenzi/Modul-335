import { Injectable } from '@angular/core';
import {AuthService} from "../auth-service/auth.service";

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
  public doLogin(loginBody: any): void {
    console.log("X", loginBody);
    this.authService.doLogin(loginBody);
  }

}
