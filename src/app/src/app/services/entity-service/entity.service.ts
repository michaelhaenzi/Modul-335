import {RestList} from "../../class/rest-list";
import {CustomHttpService} from "../custom-http-service/custom-http.service";
import {Observable} from "rxjs";
import {RestObject} from "../../class/rest-object";
import 'rxjs/Rx';
import {EntityServiceInterface} from "../../interface/entity-interface";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export abstract class EntityService implements EntityServiceInterface {

  protected abstract MOUNTPOINT: string = "";

  /**
   * Konstruktor
   */
  constructor(protected http: CustomHttpService) { }

  /**
   * {@inheritDoc}
   */
  public getList(): Observable<RestList> {
    return this.http.getList(this.MOUNTPOINT);
  }

  /**
   * {@inheritDoc}
   */
  public getSingle(id: number): Observable<RestObject> {
    return this.http.getSingle(this.MOUNTPOINT + id.toString());
  }

  /**
   * {@inheritDoc}
   */
  public postItem(id: number, body: Object): Observable<RestObject> {
    return this.http.postItem(this.MOUNTPOINT + id.toString(), body);
  }

  /**
   * {@inheritDoc}
   */
  public putItem(id: number, body: Object): Observable<RestObject> {
    return this.http.putItem(this.MOUNTPOINT + id.toString(), body);
  }

  /**
   * {@inheritDoc}
   */
  public deleteItem(id: number): Observable<RestObject> {
    return this.http.deleteItem(this.MOUNTPOINT + id.toString());
  }

}
