import { MemoryStore } from './memory-store';

interface TestData {
    message: string;
}

describe('MemoryStore', () => {

    describe('add', () => {

        it('should add value and notify all observers', () => {
            let f1 = false;
            let f2 = false;

            let store = new MemoryStore();
            store.observe<TestData>('key')
                .subscribe(data => {
                    if (data === undefined) return;
                    f1 = true;
                    expect(data.message).toBe('hello');
                });

            store.observe<TestData>('key')
                .subscribe(data => {
                    if (data === undefined) return;
                    f2 = true;
                    expect(data.message).toBe('hello');
                });

            store.add('key', { message: 'hello' });
            expect(f1).toBeTruthy();
            expect(f2).toBeTruthy();
        });

    });

    describe('addSilently', () => {

        it('should add value and should not notify observers', () => {
            let f1 = false;

            let store = new MemoryStore();
            store.observe<TestData>('key')
                .subscribe(data => {
                    if (data === undefined) return;
                    f1 = true;
                    expect(data.message).toBe('hello');
                });

            store.addSilently('key', { message: 'hello' });
            expect(f1).toBeFalsy();
        });

    });

    describe('get', () => {

        it('should get value from store', () => {
            let store = new MemoryStore();
            store.addSilently('key', { message: 'hello' });
            expect(store.get<TestData>('key').message).toBe('hello');
        });

    });

    describe('notify', () => {

        it('should notify all observers', () => {
            let f1 = false;
            let f2 = false;

            let store = new MemoryStore();
            store.observe<TestData>('key')
                .subscribe(data => {
                    if (data === undefined) return;
                    f1 = true;
                    expect(data.message).toBe('hello');
                });

            store.observe<TestData>('key')
                .subscribe(data => {
                    if (data === undefined) return;
                    f2 = true;
                    expect(data.message).toBe('hello');
                });

            store.addSilently('key', { message: 'hello' });
            store.notify('key');
            expect(f1).toBeTruthy();
            expect(f2).toBeTruthy();
        });

    });

    describe('exist', () => {

        it('should check key existence', () => {
            let store = new MemoryStore();
            store.addSilently('key', { message: 'hello' });
            expect(store.exist('key')).toBeTruthy();
            expect(store.exist('key1')).toBeFalsy();
        });

    });

    describe('remove', () => {

        it('should remove key and dispose all subscribers', () => {
            let f1 = false;
            let f2 = false;

            let store = new MemoryStore();
            store.observe<TestData>('key')
                .subscribe(data => {
                    if (data === undefined) return;
                    f1 = true;
                    expect(data.message).toBe('hello');
                });

            store.observe<TestData>('key')
                .subscribe(data => {
                    if (data === undefined) return;
                    f2 = true;
                    expect(data.message).toBe('hello');
                });

            store.addSilently('key', { message: 'hello' });

            store.remove('key');

            store.notify('key');
            expect(f1).toBeFalsy();
            expect(f2).toBeFalsy();
            expect(store.keys().length).toBe(0);

            store.add('key', { message: 'hello' });
            expect(f1).toBeFalsy();
            expect(f2).toBeFalsy();
        });

    });

});

