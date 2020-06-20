import { Observable, BehaviorSubject } from "rxjs";
import { IDataStore } from "./data-store";

export class MemoryStore implements IDataStore {

    private _data: { [key: string]: unknown } = {};

    private _subjects: { [key: string]: BehaviorSubject<unknown> } = {};

    add(key: string, value: unknown): void {
        this._data[key] = value;
        this.notify(key);
    }

    addSilently(key: string, value: unknown): void {
        this._data[key] = value;
    }

    get<V>(key: string): V {
        return this._data[key] as V;
    }

    notify(key: string): void {
        this.getSubject(key).next(this._data[key]);
    }

    observe<V>(key: string): Observable<V> {
        return this.getSubject(key).asObservable() as Observable<V>;
    }

    exist(key: string): boolean {
        return this._data[key] !== undefined;
    }

    remove(key: string): void {
        delete this._data[key];
        if(this._subjects[key]) {
            this._subjects[key].unsubscribe();
            delete this._subjects[key];
        }
    }

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