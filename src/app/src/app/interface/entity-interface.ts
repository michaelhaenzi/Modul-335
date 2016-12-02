import {RestList} from "../class/rest-list";
import {Observable} from "rxjs";
import {RestObject} from "../class/rest-object";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export interface EntityServiceInterface {

    /**
     * Holt eine Liste von der REST API / je nach MOUNTPOINT
     *
     * @returns {Observable<RestList>}
     */
    getList(): Observable<RestList>;

    /**
     * Holt ein einzelnes Object von der REST API / je nach MOUNTPOINT
     *
     * @param id
     * @returns {Observable<RestObject>}
     */
    getSingle(id: number): Observable<RestObject>;

    /**
     * Postet ein Object an die REST API / je nach MOUNTPOINT
     *
     * @param id
     * @param body
     * @returns {Observable<RestObject>}
     */
    postItem(id: number, body: Object): Observable<RestObject>;

    /**
     * Updatet ein Object auf der REST API / je nach MOUNTPOINT
     *
     * @param id
     * @param body
     * @returns {Observable<RestObject>}
     */
    putItem(id: number, body: Object): Observable<RestObject>;

    /**
     * Löscht ein Objekt auf der REST API / je nach MOUNTPOINT
     *
     * @param id
     * @returns {Observable<RestObject>}
     */
    deleteItem(id: number): Observable<RestObject>;
}
