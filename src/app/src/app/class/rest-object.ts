import {RestObjectInterface} from "../interface/class/rest-object-interface";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export class RestObject implements RestObjectInterface {

    public raw: Object = {};

    /**
     * Konstruktor
     */
    constructor(json: Object = {}) {
        this.raw = json;
    }

    /**
     * {@inheritDoc}
     */
    public display(property: string): string {
        if(this.raw[property] != null) {
            return this.raw[property].toString();
        } else {
            return "";
        }
    }

    /**
     * {@inheritDoc}
     */
    public get(property): RestObject {
        return new RestObject(this.raw[property]);
    }

    /**
     * {@inheritDoc}
     */
    public has(property: string): boolean {
        return this.raw.hasOwnProperty(property);
    }
}
