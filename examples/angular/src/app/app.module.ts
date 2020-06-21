import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMemoryStoreService } from './app-memory-store';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { Consumer1Component } from './consumer1/consumer1.component';
import { Consumer2Component } from './consumer2/consumer2.component';
import { Broadcast2Component } from './broadcast2/broadcast2.component';

@NgModule({
  declarations: [
    AppComponent,
    BroadcastComponent,
    Broadcast2Component,
    Consumer1Component,
    Consumer2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [AppMemoryStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
