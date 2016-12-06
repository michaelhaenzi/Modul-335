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
    if(localStorage.getItem("TOKEN") == null || localStorage.getItem("TOKEN") == "") {
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
     * ändert die LocalStorage Daten
     */
  public changeUserValues(): void {
      this.http.getSingle("user/" + localStorage.getItem("USER_ID")).subscribe((res: RestObject) => {
          if (res.has("firstname") && res.has("lastname")) {
              localStorage.setItem("FIRSTNAME", res.display("firstname"));
              localStorage.setItem("LASTNAME", res.display("lastname"));
              localStorage.setItem("FILEPATH", res.display("file_path"));
              localStorage.setItem("PHONENUMBER", res.display("phonenumber"));
              localStorage.setItem("EMAIL", res.display("email"));
              localStorage.setItem("STATUS", res.display("status"));
          }
      });
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
            if (json.hasOwnProperty("Authorization") && json.hasOwnProperty("userId")) {
              localStorage.setItem("TOKEN", json["Authorization"]);
              localStorage.setItem("USER_ID", json["userId"]);
                this.http.getSingle("user/" + json["userId"]).subscribe((res: RestObject) => {
                    if (res.has("firstname") && res.has("lastname")) {
                        localStorage.setItem("FIRSTNAME", res.display("firstname"));
                        localStorage.setItem("LASTNAME", res.display("lastname"));
                        localStorage.setItem("FILEPATH", res.display("file_path"));
                        localStorage.setItem("PHONENUMBER", res.display("phonenumber"));
                        localStorage.setItem("EMAIL", res.display("email"));
                        localStorage.setItem("STATUS", res.display("status"));
                        resolve();
                    }
                });
            } else {
              reject();
            }
          }, (err) => {
            reject();
          });
    });
  }

  /**
   * Führt einen REST Login aus
   *
   * @param form
   */
  public doRegister(loginBody: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.postItem("register", loginBody)
          .subscribe((res: RestObject) => {
            if (res.has("Authorization") && res.has("userId")) {
              localStorage.setItem("TOKEN", res.display("Authorization"));
              localStorage.setItem("USER_ID", res.display("userId"));
              this.http.getSingle("user/" + res.display("userId")).subscribe((res: RestObject) => {
                  if (res.has("firstname") && res.has("lastname")) {
                      localStorage.setItem("FIRSTNAME", res.display("firstname"));
                      localStorage.setItem("LASTNAME", res.display("lastname"));
                      resolve();
                  }
              });
            } else {
              reject();
            }
          }, (err) => {
            reject();
          });
    });
  }

}
