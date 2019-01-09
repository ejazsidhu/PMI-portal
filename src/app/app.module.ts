import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import 'hammerjs';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{HttpModule} from '@angular/http'
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


BrowserModule

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    MatCardModule,
    BrowserAnimationsModule
    
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
