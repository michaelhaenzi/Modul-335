import {RestObject} from "./rest-object";

export class RestList {

    public list: RestObject[] = new Array<RestObject>();
    public size: number = 0;

    /**
     * Konstruktor
     */
    constructor(json: Object[] = []) {
        this.size = json.length;
        for (let restObject of json) {
            this.list.push(new RestObject(restObject));
        }
    }
}
