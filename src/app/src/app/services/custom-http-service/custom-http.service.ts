import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {CustomHttpContextService} from "../../context/http-context/custom-http-context.service";
import {Observable} from "rxjs";
import {RestList} from "../../class/rest-list";
import {RestObject} from "../../class/rest-object";
import 'rxjs/Rx';

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class CustomHttpService {

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
  public preRequest(): void {
    this.httpContext.getToken()
      .then((token: string) => {
        if(token != "" || !this.headers.has("Authorization")) {
          this.headers.append("Authorization", "Bearer" + token);
        }
    });
  }

  /**
   * Holt Daten von der REST API und macht eine RestList
   *
   * @param url
   * @returns {Observable<R>}
   */
  public getList(url: string): Observable<RestList> {
    this.preRequest();
    console.log("getListX:" + this.httpContext.BASEURL + url);
    return this.http.get(this.httpContext.BASEURL + url, {headers: this.headers}).map(res => new RestList(res.json()));
  }

  /**
   * Holt Daten von der REST API und macht eine RestObject
   *
   * @param url
   * @returns {Observable<R>}
   */
  public getSingle(url: string): Observable<RestObject> {
    this.preRequest();
    return this.http.get(this.httpContext.BASEURL + url, {headers: this.headers}).map(res => new RestObject(res.json()));
  }

  /**
   * Postet ein Object an die REST API
   *
   * @param url
   * @param body
   * @returns {Observable<R>}
   */
  public post(url: string, body: Object): Observable<RestObject> {
    this.preRequest();
    return this.http.post(this.httpContext.BASEURL + url, body, {headers: this.headers}).map(res => new RestObject(res.json()));
  }

  /**
   * Updatet ein Object auf der REST API
   *
   * @param url
   * @param body
   * @returns {Observable<R>}
   */
  public put(url: string, body: Object): Observable<RestObject> {
    this.preRequest();
    return this.http.put(this.httpContext.BASEURL + url, body, {headers: this.headers}).map(res => new RestObject(res.json()));
  }

}