import { Injectable } from '@angular/core';
import {CustomHttpService} from "../custom-http-service/custom-http.service";
import {RestObject} from "../../class/rest-object";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class AuthService {

  private loggedIn: boolean = true;
  private MOUNTPOINT: string = "auth";

  /**
   * Konstruktor
   */
  constructor(private http: CustomHttpService) { }

  /**
   * returns if logged in
   *
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /**
   * Führt einen REST Login aus
   *
   * @param form
   */
  public doLogin(loginBody: any): void {
    this.http.auth(loginBody).subscribe((res: RestObject) => {
      console.log("Antwort: ", res);
    }, (err) => {
      console.log("Error: ", err);
    });
  }

}
