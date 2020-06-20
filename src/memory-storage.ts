import { Observable, Subject } from "rxjs";
import { IDataStorage } from "./storage";

export class MemoryStorage implements IDataStorage {

    private _data: { [key: string]: unknown } = {};

    private _subjects: { [key: string]: Subject<unknown> } = {};

    add(key: string, value: unknown): void {
        this._data[key] = value;
        this.notify(key);
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

    private getSubject(key: string): Subject<unknown> {
        if (!this._subjects[key]) {
            this._subjects[key] = new Subject();
        }
        return this._subjects[key];
    }
}