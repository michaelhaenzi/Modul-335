import {RestList} from "../class/rest-list";
import {Observable} from "rxjs";
import {RestObject} from "../class/rest-object";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export interface HttpInterface {

    /**
     * Holt Daten von der REST API und macht eine RestList
     *
     * @param url
     * @returns {Observable<R>}
     */
    getList(url: string): Observable<RestList>;

    /**
     * Holt Daten von der REST API und macht eine RestObject
     *
     * @param url
     * @returns {Observable<R>}
     */
    getSingle(url: string): Observable<RestObject>;

    /**
     * Postet ein Object an die REST API
     *
     * @param url
     * @param body
     * @returns {Observable<R>}
     */
    postItem(url: string, body: Object): Observable<RestObject>;

    /**
     * Updatet ein Object auf der REST API
     *
     * @param url
     * @param body
     * @returns {Observable<R>}
     */
    putItem(url: string, body: Object): Observable<RestObject>;

    /**
     * Löscht ein Object auf der REST API
     *
     * @param url
     * @param body
     * @returns {Observable<R>}
     */
    deleteItem(url: string): Observable<RestObject>;
}
