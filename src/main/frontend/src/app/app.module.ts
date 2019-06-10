import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { FormsModule } from "@angular/forms";

import { routes } from "./app.router";

import { AppComponent } from './app.component';

import { LibService } from './services/lib.service';

import { CreateComponent } from './views/document/create/create.component';
import { UpdateComponent } from './views/document/update/update.component';
import { ListComponent } from './views/document/list/list.component';
import { DeleteComponent } from './views/document/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    ListComponent,
    DeleteComponent,
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
