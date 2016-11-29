import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {CustomHttpContextService} from "../../context/http-context/custom-http-context.service";
import {Observable} from "rxjs";
import {RestList} from "../../class/rest-list";
import {RestObject} from "../../class/rest-object";
import any = jasmine.any;

@Injectable()
export class CustomHttpService {

  private headers: Headers = new Headers();

  /**
   * Konstruktor
   */
  constructor(private http: Http, private httpContext: CustomHttpContextService) {
    this.headers.append("Content-Type", "application/json");
  }

  public preRequest(): void {
    let token = this.httpContext.getToken();
    if(token != "" || !this.headers.has("Authorization")) {
      this.headers.append("Authorization", "Bearer" + token);
    }
  }

  public getList(url: string): Observable<RestList> {
    this.preRequest();
    return this.http.get(this.httpContext.BASEURL + url, {headers: this.headers}).map(res => new RestList(res.json()));
  }

  public getSingle(url: string): Observable<RestObject> {
    this.preRequest();
    return this.http.get(this.httpContext.BASEURL + url, {headers: this.headers}).map(res => new RestObject(res.json()));
  }

  public post(url: string, body: Object): Observable<Response> {
    this.preRequest();
    return this.http.post(this.httpContext.BASEURL + url, body, {headers: this.headers});
  }

}