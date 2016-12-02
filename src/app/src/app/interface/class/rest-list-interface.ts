import {RestObject} from "../../class/rest-object";
import {RestList} from "../../class/rest-list";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export interface RestListInterface {

    items: RestObject[];
    length: number;

    /**
     * Setzt die Länge der RestList (X-Total-Count des headers)
     *
     * @param json
     */
    lengthInitializer(json: Object[]): void;

    /**
     * setzt die Liste aller Items
     *
     * @param json
     */
    itemsInitializer(json: Object[]): void;

    /**
     * mergt 2 Restlisten zusammen
     *
     * @param restList
     */
    mergeItems(restList: RestList): void;
}
