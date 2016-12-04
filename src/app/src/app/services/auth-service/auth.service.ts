import { Injectable } from '@angular/core';
import {CustomHttpService} from "../custom-http-service/custom-http.service";
import {RestObject} from "../../class/rest-object";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class AuthService {

  public loggedIn: boolean = false;
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

  public doLogout(): void {
    this.loggedIn = false;
  }

  /**
   * Führt einen REST Login aus
   *
   * @param form
   */
  public doLogin(loginBody: any): Observable<any> {
    return this.http.auth(loginBody);
  }

}
