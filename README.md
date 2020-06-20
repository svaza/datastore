# datastore
A simple javascript library for managing the state.
Nothing is out of the box, all is the play of rxjs BehaviorSubject<>

# design and inspiration
Managing application state can sometime become a complex problem, especially when there is a requirement to perform an action when data changes overtime. An action can be as simple as updating a UI component when it happens.


There have been frameworks which performs an action when data changes i.e when instance of that data changes, however many times there might not be a need to create copy to avoid mutation, sometimes you would like to mutate the complex object, For example updating a property value in an array of complex objects which might be rendered as table in UI.

Sometimes to support the principle of not mutating an object one might end up structuring an app in a particular way which might make code more complex, For example, A UI component might be unnecessarily broken into tens of components to support this principle.

So this library is for the devs who wants to mutate a particular object and at the same time enable the app to perform some action when it happens, however notifying the app about the action is sole responsibility of the developer. By this way a dev gets more fine grained control.

This can be easily achieved by directly using rxjs, however one of the important design requirement is to have a data structure which helps managing data and subscriptions centrally which [IDataStore](https://github.com/svaza/datastore/blob/master/src/data-store.ts) helps in doing that.


# how it works
Uses rxjs for managing subscriptions centrally. Every data is identified by a key (of string type), same key can be used to register subscriptions over the data, or perform any of the operations as defined by [IDataStore](https://github.com/svaza/datastore/blob/master/src/data-store.ts) data structure.

# usage
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
    // stop observing
    subscription.unsubscibe();
```


- Add some data
``` typescript
    // adding data notifies all observers of that key
    store.add('<key>', { message: 'hello world' });

    // add data without notifying all observers of that key
    store.addSilently('<key>', { message: 'hello world' });
```

- Simply get the data for the given key
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

# license
MIT