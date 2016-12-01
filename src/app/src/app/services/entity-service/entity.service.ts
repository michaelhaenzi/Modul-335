import {RestList} from "../../class/rest-list";
import {CustomHttpService} from "../custom-http-service/custom-http.service";
import {Observable} from "rxjs";
import {RestObject} from "../../class/rest-object";
import {Injectable} from "@angular/core";

@Injectable()
export class EntityService {

  protected MOUNDPOINT: string = "";

  constructor(protected http: CustomHttpService) { }

  public getList(): Observable<RestList> {
    return this.http.getList(this.MOUNDPOINT);
  }

  public getSingle(id: number): Observable<RestObject> {
    return this.http.getSingle(this.MOUNDPOINT + id.toString());
  }

  public postItem(id: number, body: Object): Observable<RestObject> {
    return this.http.post(this.MOUNDPOINT + id.toString(), body);
  }

  public putItem(id: number, body: Object): Observable<RestObject> {
    return this.http.put(this.MOUNDPOINT + id.toString(), body);
  }

}
