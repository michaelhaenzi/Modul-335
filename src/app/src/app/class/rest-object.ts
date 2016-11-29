export class RestObject {

    public raw: Object = {};

    /**
     * Konstruktor
     */
    constructor(json: Object = {}) {
        this.raw = json;
    }

    /**
     * Gibt Property zurück
     *
     * @param property
     */
    public display(property: string): string {
        return this.raw[property].toString();
    }

    /**
     * Gibt ein inneres Objekt als RestObject zurück
     *
     * @param property
     * @returns {RestObject}
     */
    public get(property): RestObject {
        return new RestObject(this.raw[property]);
    }

    /**
     * Findet heraus, ob es die Property besitzt
     *
     * @param property
     * @returns {boolean}
     */
    public has(property: string): any {
        return this.raw.hasOwnProperty(property);
    }
}
