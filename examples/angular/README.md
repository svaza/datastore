# sample angular implementation
This App demonstrates sample angular implementation

## how to register store for DI ?
The basic memory store does not have angular dependency to keep it generic and dependency free. One way to inject it using DI is to have a service as shown below which extends the core MemoryStore. 
The extended service can be used in angular which ever way you like. 
This appears very clean approach as it avoids any direct dependency in your code.

``` typescript
import { Injectable } from '@angular/core';
import { MemoryStore } from '@svaza/datastore';

@Injectable()
export class AppMemoryStoreService extends MemoryStore {

}
```

## how do we broadcast ?
Example
``` typescript
this.store.add<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey, 
    { message: `Hello at ${ new Date().toLocaleString() }` });
``` 

## You can find 3 scenarios which demonstrates the basic usage
### In a component with OnPush change detection strategy, using async pipe it works seamlessly

consumer1
``` typescript
this.$broadcastMessage = this.store.observe<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey);
```

template
``` html
<span>{{ ($broadcastMessage | async)?.message }}</span>
```


### In a component with default change detection, this requires manual subscription and unsubscription when component destroys

consumer2
``` typescript
  ngOnInit(): void {
    this.subscription = this.store.observe<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey)
      .subscribe(message => this.broadcastMessage = message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
```

template
``` html
<span>{{ broadcastMessage?.message }}</span>
```


### The data from store is mutated and notified

broadcast2
``` typescript
var message = this.store.get<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey);
if (message) {
    message.message = 'This was mutated and broadcasted';
    this.store.notify(DataStoreKeys.BroadcastMessageKey);
}
```


