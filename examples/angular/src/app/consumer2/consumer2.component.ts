import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastMessage } from '../models';
import { AppMemoryStoreService } from '../app-memory-store';
import { Subscription } from 'rxjs';
import { DataStoreKeys } from '../data-store-keys';

@Component({
  selector: 'app-consumer2',
  templateUrl: './consumer2.component.html'
})
export class Consumer2Component implements OnInit, OnDestroy {

  broadcastMessage: BroadcastMessage;
  private subscription: Subscription;

  constructor(private store: AppMemoryStoreService) { }

  ngOnInit(): void {
    this.subscription = this.store.observe<BroadcastMessage>(DataStoreKeys.BroadcastMessageKey)
      .subscribe(message => this.broadcastMessage = message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
