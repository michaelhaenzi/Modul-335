import { Injectable } from '@angular/core';
import {CustomHttpService} from "../custom-http-service/custom-http.service";
import {Response} from "@angular/http";

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

  public doLogin(form: Object): void {
    this.http.post("auth", form).subscribe((res: Response) => {
      console.log("Antwort: ", res.json());
    }, (err) => {
      console.log("Error: ", err);
    });
  }

}
