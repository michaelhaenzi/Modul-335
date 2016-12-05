import { Component, OnInit } from '@angular/core';

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  public firstname: string = "";
  public lastname: string = "";
  public login: string = "";
  public password: string = "";

  constructor() { }

  ngOnInit() {

  }

  public doRegister(): void {

  }

}
