import { Observable } from 'rxjs';

/**
 * Represents a typical datastore data structure
 */
export interface IDataStore {

    add<V>(key: string, value: V): void;

    addSilently<V>(key: string, value: V): void;
    
    get<V>(key: string): V;
    
    notify(key: string): void;
    
    observe<V>(key: string): Observable<V>;
    
    exist(key: string): boolean;
    
    remove(key: string): void;

    keys(): string[];
}