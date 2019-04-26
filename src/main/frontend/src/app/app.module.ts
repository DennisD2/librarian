import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { routes } from "./app.router";

import { AppComponent } from './app.component';

import { LibService } from './services/lib.service';
import { CreateComponent } from './views/create/create.component';
import { UpdateComponent } from './views/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [
    LibService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
