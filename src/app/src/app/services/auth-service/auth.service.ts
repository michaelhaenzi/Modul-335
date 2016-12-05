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

  public loggedIn: boolean;

  /**
   * Konstruktor
   */
  constructor(private http: CustomHttpService) {
    if(window["TOKEN"] == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  /**
   * returns if logged in
   *
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /**
   * setzt loggedIn auf true
   */
  public setLoggedIn(): void {
    this.loggedIn = true;
  }

  /**
   * setzt loggedIn auf false
   */
  public doLogout(): void {
    this.loggedIn = false;
  }

  /**
   * Führt einen REST Login aus
   *
   * @param form
   */
  public doLogin(loginBody: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.auth(loginBody)
        .subscribe((res: Response) => {
          let json: Object = res.json();
          if (!json.hasOwnProperty("Authorization")) {
            window["TOKEN"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyIiwiaXAiOiI6OjEifQ.1QkQmk5-XAUd1vAKNnFz6PmHHHZZ7IOuDWGh9rYi0LE";
            resolve();
          } else {
            reject();
          }
        }, (err) => {
          reject();
        });
    });
  }

}
