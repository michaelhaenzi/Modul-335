import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Subject} from "rxjs";
import {Observable} from "rxjs";

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
@Injectable()
export class EventsService {

    public listeners: any;
    public eventsSubject: Subject<any>;
    public events: Observable<any>;

    /**
     * Konstruktor
     */
    constructor() {
        this.listeners = {};
        this.eventsSubject = new Rx.Subject();

        this.events = Rx.Observable.from(this.eventsSubject);

        this.events.subscribe(
            ({name, args}) => {
                if (this.listeners[name]) {
                    for (let listener of this.listeners[name]) {
                        listener(...args);
                    }
                }
            });
    }

    /**
     * funktion registieren
     *
     * @param name
     * @param listener
     */
    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }

        this.listeners[name].push(listener);
    }

    /**
     * trigger für funktion
     *
     * @param name
     * @param args
     */
    broadcast(name, ...args) {
        this.eventsSubject.next({
            name,
            args
        });
    }
}