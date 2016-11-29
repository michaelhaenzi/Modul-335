import { Injectable } from '@angular/core';

@Injectable()
export class CustomHttpContextService {

  public BASEURL: string = "http://api.localhost/api/v1/";

  constructor() { }

  public getToken(): string {
    return ""
  }

}
