import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppMemoryStoreService } from '../app-memory-store';
import { DataStoreKeys } from '../data-store-keys';
import { BroadcastMessage } from '../models';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BroadcastComponent {

  constructor(private store: AppMemoryStoreService) { }

  onBroadcastClick() {
    this.store.add<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey, { message: `Hello at ${ new Date().toLocaleString() }` });
  }

}
