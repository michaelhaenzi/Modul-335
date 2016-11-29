import { Injectable } from '@angular/core';
import {AuthService} from "../auth-service/auth.service";

@Injectable()
export class LoginService {

  constructor(private authService: AuthService) { }

  public doLogin(form: Object): void {
    this.authService.doLogin(form);
  }

}
