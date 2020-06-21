import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppMemoryStoreService } from '../app-memory-store';
import { BroadcastMessage } from '../models';
import { DataStoreKeys } from '../data-store-keys';

@Component({
  selector: 'app-broadcast2',
  templateUrl: './broadcast2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Broadcast2Component {
  flag = false;
  constructor(private store: AppMemoryStoreService) { }

  onBroadcastClick() {
    var message = this.store.get<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey);
    if (message) {
      message.message = 'This was mutated and broadcasted';
      this.store.notify(DataStoreKeys.BroadcastMessageKey);
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

}
