import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login-service/login.service";

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

  public login: string;
  public password: string;

  /**
   * Konstruktor
   */
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }

  /**
   * Beim drücken des Login buttons
   */
  public doLogin(): void {
    console.log(this.login + ":" + this.password);
    this.loginService.doLogin({login: this.login, password: this.password});
  }

}
