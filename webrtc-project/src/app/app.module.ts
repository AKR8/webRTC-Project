import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {routingComponents} from '../app/app-routing.module';
// import { TestJSComponent } from './test-js/test-js.component';

@NgModule({
  declarations: [
    // AppComponent,
    routingComponents,
    // TestJSComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
