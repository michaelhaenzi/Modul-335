import { Injectable } from '@angular/core';

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Injectable()
export class CustomHttpContextService {

  public BASEURL: string = "http://api.localhost/api/v1/";

  constructor() { }

  /**
   * Gibt den Token zurück
   *
   * @returns {string}
   */
  public getToken(): string {
    return ""
  }

}
