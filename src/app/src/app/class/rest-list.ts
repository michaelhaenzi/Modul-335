import {RestObject} from "./rest-object";
import {RestListInterface} from "../interface/class/rest-list-interface";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export class RestList implements RestListInterface {

    public items: RestObject[] = new Array<RestObject>();
    public length: number = 0;

    /**
     * Konstruktor
     */
    constructor(json: Object[] = []) {
        this.lengthInitializer(json);
        this.itemsInitializer(json);
    }

    /**
     * {@inheritDoc}
     */
    public lengthInitializer(json: Object[]): void {
        this.length = json.length;
    }

    /**
     * {@inheritDoc}
     */
    public itemsInitializer(json: Object[]): void {
        json.forEach((restObject: Object) => this.items.push(new RestObject(restObject)));
    }

    /**
     * {@inheritDoc}
     */
    public mergeItems(restList: RestList): void {
        this.items.concat(restList.items);
    }
}
