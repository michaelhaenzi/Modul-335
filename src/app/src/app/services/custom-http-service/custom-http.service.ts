import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {CustomHttpContextService} from "../../context/http-context/custom-http-context.service";
import {Observable} from "rxjs";
import {RestList} from "../../class/rest-list";
import {RestObject} from "../../class/rest-object";
import 'rxjs/Rx';
import {HttpInterface} from "../../interface/service/http-interface";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class CustomHttpService implements HttpInterface {

  private headers: Headers = new Headers();

  /**
   * Konstruktor
   */
  constructor(private http: Http, private httpContext: CustomHttpContextService) {
    this.headers.append("Content-Type", "application/json");
  }

  /**
   * Wird vor der Anfrage ausgeführt
   */
  private preRequest(): void {
    if(!this.headers.has("Authorization")) {
      this.httpContext.getToken()
          .then((token: string) => {
            if(token != "") {
              this.headers.append("Authorization", "Bearer" + token);
            }
          });
    }
  }

  /**
   * setzt die Auth Header
   *
   * @returns {Headers}
   */
  private preAuth(loginBody: any): Headers {
    let head: Headers = new Headers();
    head.append("Authorization", "Basic " + btoa(loginBody.login + ":" + loginBody.password));
    return head;
  }

  /**
   * {@inheritDoc}
   */
  public getList(url: string): Observable<RestList> {
    this.preRequest();
    return this.http.get(this.httpContext.BASEURL + url, {headers: this.headers}).map((res: Response) => new RestList(res.json()));
  }

  /**
   * {@inheritDoc}
   */
  public getSingle(url: string): Observable<RestObject> {
    this.preRequest();
    return this.http.get(this.httpContext.BASEURL + url, {headers: this.headers}).map((res: Response) => new RestObject(res.json()));
  }

  /**
   * {@inheritDoc}
   */
  public postItem(url: string, body: Object): Observable<RestObject> {
    this.preRequest();
    return this.http.post(this.httpContext.BASEURL + url, body, {headers: this.headers}).map((res: Response) => new RestObject(res.json()));
  }

  /**
   * {@inheritDoc}
   */
  public putItem(url: string, body: Object): Observable<RestObject> {
    this.preRequest();
    return this.http.put(this.httpContext.BASEURL + url, body, {headers: this.headers}).map((res: Response) => new RestObject(res.json()));
  }

  /**
   * {@inheritDoc}
   */
  public deleteItem(url: string): Observable<RestObject> {
    this.preRequest();
    return this.http.delete(this.httpContext.BASEURL + url, {headers: this.headers}).map((res: Response) => new RestObject(res.json()));
  }

  /**
   * Loggt sich bei der REST API ein
   *
   * @returns {Observable<R>}
   */
  public auth(loginBody: any): Observable<any> {
    return this.http.post(this.httpContext.BASEURL + "auth", {}, {headers: this.preAuth(loginBody)});
  }

}