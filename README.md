# datastore
![CI](https://github.com/svaza/datastore/workflows/CI/badge.svg?branch=master)

A simple javascript library for managing the state.
Nothing is out of the box, all is the play of rxjs BehaviorSubject<>

# design and inspiration
To be point straight [IDataStore](https://github.com/svaza/datastore/blob/master/src/data-store.ts) implementation was developed to keep state management more simple, hence it works on principle of `mutating the data`, mutation wont work with simple primitive types because the way they are managed in javascript. Its  developer's responsibility to notify all observers of a key if in code the complex object is changed in any way.

Managing application state can sometime become a complex problem, especially when there is a requirement to perform an action when data changes overtime. An action can be as simple as updating a UI component when it happens.


Sometimes to support the principle of not mutating an object one might end up structuring an app in a particular way which might make code more complex, For example, A UI component might be unnecessarily broken into tens of components to support this principle.

Rxjs actually makes the statemanagement more simple and this library is just a small wrapper which manages state centrally, and provides few helpful methods to work with the state

This can be easily achieved by directly using rxjs, however one of the important design requirement is to have a data structure which helps managing data and subscriptions centrally which [IDataStore](https://github.com/svaza/datastore/blob/master/src/data-store.ts) helps in doing that.


# how it works
Uses rxjs for managing subscriptions centrally. Every data is identified by a key (of string type), same key can be used to register subscriptions over the data, or perform any of the operations as defined by [IDataStore](https://github.com/svaza/datastore/blob/master/src/data-store.ts) data structure.

# installation
```
    npm i @svaza/datastore
```

# dependencies
- [Rxjs](https://github.com/ReactiveX/rxjs)

# important!!
Please go through complete usage below to understand how this library works

# usage
- For implementation in angular, refer [examples/angular](https://github.com/svaza/datastore/tree/master/examples/angular)
- Simply create an instance of required type of store implementation
``` typescript
    let store: IDataStore = new MemoryStore();
```


- Register subscription over a key, the subscription will be immediately called as underlying channel is BehaviourSubject<>, to ignore initial subscription incase when there is no data, perform a check on the data provided, if its undefined then simply ignore it.
If the required key already has data associated with it then subscription will be called immediately with respective data - As underlying channel is BehaviourSubject<>
``` typescript
    var subscription = store.observe('<key>')
                            .subscribe(data => {
                                // handle the data change
                                // ignore if data is undefined
                                if(data === undefined) return;
                            });
    // stop observing, if needed
    subscription.unsubscibe();
```


- Add some data
``` typescript
    // adding data notifies all observers of that key
    store.add<SomeType>('<key>', { message: 'hello world' });

    // add data without notifying all observers of that key
    store.addSilently<SomeType>('<key>', { message: 'hello world' });
```

- Simply get the data for the given key. 
> Important thing to note here is that get() returns the actual underlying reference to the data, So if the respective data is a complex object then changing any of its properties will also change underlying data, i.e javascript reference types and primitive types rules applies here too. 
In this situation you might need to manually notify all obsrvers of the key as explained in `Mutating the data and notifying observers` usecase below

``` typescript
    let data: SomeModel = store.get<SomeModel>('<key>');
```

- Mutating the data and notifying observers
``` typescript
    let data: SomeModel = store.get<SomeModel>('<key>');
    data.message = 'hello universe'; // at this point none of the observers will be notified
    // its dev responsibility to manually notify all observers using notify()
    store.notify('<some key>');
```

- Removing a key
``` typescript
    // removing a key also unsubscribes the underlying Subject associated with that key, Once key is removed, all underlying observers becomes stale and adding data under same key again will have no effect
    // useful during dispose
    store.remove('key');
```

- Get list of keys
``` typescript
    string[] keys = store.keys();
```

# maintainers
- [svaza](https://github.com/svaza)


# version history
- v1.0.0
    - initial version
    - support for memory store
    - basic store data structure


# license
MIT