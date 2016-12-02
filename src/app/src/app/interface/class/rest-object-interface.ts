import {RestObject} from "../../class/rest-object";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
export interface RestObjectInterface {

    raw: Object;

    /**
     * Gibt Property zurück
     *
     * @param property
     */
    display(property: string): string;

    /**
     * Gibt ein inneres Objekt als RestObject zurück
     *
     * @param property
     * @returns {RestObject}
     */
    get(property): RestObject;

    /**
     * Findet heraus, ob es die Property besitzt
     *
     * @param property
     * @returns {boolean}
     */
    has(property: string): boolean;
}
