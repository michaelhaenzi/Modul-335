import {RestList} from "../../class/rest-list";
import {CustomHttpService} from "../custom-http-service/custom-http.service";
import {Observable} from "rxjs";
import {RestObject} from "../../class/rest-object";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export abstract class EntityService {

  protected abstract MOUNTPOINT: string = "";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) { }

  /**
   * Holt eine Liste von der REST API / je nach MOUNTPOINT
   *
   * @returns {Observable<RestList>}
   */
  public getList(): Observable<RestList> {
    return this.http.getList(this.MOUNTPOINT);
  }

  /**
   * Holt ein einzelnes Object von der REST API / je nach MOUNTPOINT
   *
   * @param id
   * @returns {Observable<RestObject>}
   */
  public getSingle(id: number): Observable<RestObject> {
    return this.http.getSingle(this.MOUNTPOINT + id.toString());
  }

  /**
   * Postet ein Object an die REST API / je nach MOUNTPOINT
   *
   * @param id
   * @param body
   * @returns {Observable<RestObject>}
   */
  public postItem(id: number, body: Object): Observable<RestObject> {
    return this.http.post(this.MOUNTPOINT + id.toString(), body);
  }

  /**
   * Updatet ein Object auf der REST API / je nach MOUNTPOINT
   *
   * @param id
   * @param body
   * @returns {Observable<RestObject>}
   */
  public putItem(id: number, body: Object): Observable<RestObject> {
    return this.http.put(this.MOUNTPOINT + id.toString(), body);
  }

}
