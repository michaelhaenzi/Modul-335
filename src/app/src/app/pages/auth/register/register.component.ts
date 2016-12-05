import { Component, OnInit } from '@angular/core';
import {CustomHttpService} from "../../../services/custom-http-service/custom-http.service";
import {AuthService} from "../../../services/auth-service/auth.service";
import {EventsService} from "../../../services/events.service";

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

  constructor(private http: AuthService, private eventsService: EventsService
  ) { }

  ngOnInit() {

  }

  public doRegister(): void {
    this.http.doRegister({firstname: this.firstname, lastname: this.lastname, login: this.login, password: this.password}).then((res: any) => {
      this.eventsService.trigger("auth:login");
    }).catch((err) => {
      console.log("Error: ", err);
    });
  }
}
