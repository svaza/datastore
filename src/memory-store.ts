import { Observable, BehaviorSubject } from "rxjs";
import { IDataStore } from "./data-store";

/**
 * A simple in memory data store implementing IDataStore data structure
 */
export class MemoryStore implements IDataStore {

    private _data: { [key: string]: unknown } = {};

    private _subjects: { [key: string]: BehaviorSubject<unknown> } = {};

    /**
     * @summary Add a value against provided key, this also notifies all subscribers once the key is added
     * @param key The key to be added
     * @param value Any value of type V
     */
    add<V>(key: string, value: V): void {
        this._data[key] = value;
        this.notify(key);
    }

    /**
     * @summary Add a value against provided key, This will not notify the subscribers
     * @param key The key to be added
     * @param value Any value of type V
     */
    addSilently<V>(key: string, value: V): void {
        this._data[key] = value;
    }

    /**
     * @summary fetch value against the provided key
     * @param key The key for which value to be fetched
     */
    get<V>(key: string): V {
        return this._data[key] as V;
    }

    /**
     * @summary Notify all subscribers of the given key
     * @param key 
     */
    notify(key: string): void {
        this.getSubject(key).next(this._data[key]);
    }

    /**
     * @summary Subscribe to the provided key
     * @param key 
     */
    observe<V>(key: string): Observable<V> {
        return this.getSubject(key).asObservable() as Observable<V>;
    }

    /**
     * @summary Check whether key exist in the store
     * @param key 
     */
    exist(key: string): boolean {
        return this._data[key] !== undefined;
    }

    /**
     * @summary Remove the given key from the store, this also unsubscribes the underlying BehaviorSubject<>
     * So all the existing subscribers becomes stale after this operation, hence useful during dispose operation
     * 
     * @description After removing even if the same key is added again, the existing subscribers will still remain stale.
     * In this case the key needs to be subscribed again.
     * So its recommended to use remove() carefully
     * @param key 
     */
    remove(key: string): void {
        delete this._data[key];
        if(this._subjects[key]) {
            this._subjects[key].unsubscribe();
            delete this._subjects[key];
        }
    }

    /**
     * @summary Get all keys in the store
     */
    keys(): string[] {
        return Object.keys(this._data);
    }

    private getSubject(key: string): BehaviorSubject<unknown> {
        if (!this._subjects[key]) {
            this._subjects[key] = new BehaviorSubject(undefined);
        }
        return this._subjects[key];
    }
}