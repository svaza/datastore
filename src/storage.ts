import { Observable } from 'rxjs';

export interface IDataStorage {
    
    add(key: string, value: unknown): void;
    
    get<V>(key: string): V;
    
    notify(key: string): void;
    
    observe<V>(key: string): Observable<V>;
    
    exist(key: string): boolean;
    
    remove(key: string): void;

    keys(): string[];
}