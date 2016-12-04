import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login-service/login.service";
import {RestObject} from "../../../class/rest-object";
import {Router} from "@angular/router";
import {Response} from "@angular/http";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  public login: string = "";
  public password: string = "";
  public loginError: any = {error: false, message: ""};

  /**
   * Konstruktor
   */
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  /**
   * Beim drücken des Login buttons
   */
  public doLogin(): void {
    if(this.login.trim() == "" || this.password.trim() == "") {
      this.loginError.error = true;
      this.loginError.message = "Bitte Formular ausfüllen.";
    } else {
      this.loginService.doLogin({login: this.login, password: this.password}).subscribe((res: Response) => {
        this.router.navigateByUrl('/chats');
      }, (err) => {
        console.log("Error: ", err);
        this.loginError.error = true;
        this.loginError.message = "Fehler beim anmelden.";
      });;
    }
  }

}
