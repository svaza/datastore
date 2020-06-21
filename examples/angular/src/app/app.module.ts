import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMemoryStoreService } from './app-memory-store';
import { BroadcastComponent } from './broadcast-component/broadcast.component';
import { Consumer1Component } from './consumer1/consumer1.component';
import { Consumer2Component } from './consumer2/consumer2.component';

@NgModule({
  declarations: [
    AppComponent,
    BroadcastComponent,
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
