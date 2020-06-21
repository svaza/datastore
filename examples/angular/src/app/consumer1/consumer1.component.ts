import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BroadcastMessage } from '../models';
import { AppMemoryStoreService } from '../app-memory-store';
import { DataStoreKeys } from '../data-store-keys';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consumer1',
  templateUrl: './consumer1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Consumer1Component implements OnInit {

  $broadcastMessage: Observable<BroadcastMessage>;

  constructor(private store: AppMemoryStoreService) { }

  ngOnInit(): void {
    this.$broadcastMessage = this.store.observe<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey);
  }

}
