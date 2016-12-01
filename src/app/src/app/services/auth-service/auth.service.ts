import { Injectable } from '@angular/core';
import {CustomHttpService} from "../custom-http-service/custom-http.service";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class AuthService {

  private loggedIn: boolean = true;

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
  public doLogin(form: Object): void {
    /*this.http.post("auth", form).subscribe((res: Response) => {
      console.log("Antwort: ", res.json());
    }, (err) => {
      console.log("Error: ", err);
    });*/
  }

}
