import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';

import { routes } from "./app.router";

import { AppComponent } from './app.component';

import { LibService } from './services/lib.service';
import { CreateComponent } from './views/create/create.component';
import { UpdateComponent } from './views/update/update.component';
import { ListComponent } from './views/list/list.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    FormsModule
  ],
  providers: [
    LibService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
