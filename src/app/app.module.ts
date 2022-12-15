import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicStorageModule } from '@ionic/storage-angular';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, // added HTTP Client Module for outgoing HTTP request
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    Ng2SearchPipeModule,
  ],
  providers: [Storage,{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}

