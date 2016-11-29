import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login-service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  public login: string = "";
  public password: string = "";

  /**
   * Konstruktor
   */
  constructor(private loginService: LoginService) { }

  public doLogin(): void {
    this.loginService.doLogin({login: this.login, password: this.password});
  }

}
