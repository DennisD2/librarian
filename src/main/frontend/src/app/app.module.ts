import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";

import {routes} from "./app.router";

import {AppComponent} from './app.component';

import {LibService} from './services/lib.service';

import {DocumentCreateComponent} from './views/document/create/document-create.component';
import {DocumentUpdateComponent} from './views/document/update/document-update.component';
import {DocumentListComponent} from './views/document/list/document-list.component';
import {DocumentDeleteComponent} from './views/document/delete/document-delete.component';
import {CategoryListComponent} from './views/category/category-list/category-list.component';
import {CategoryUpdateComponent} from './views/category/category-update/category-update.component';
import {CategoryCreateComponent} from './views/category/category-create/category-create.component';
import {CategoryDeleteComponent} from './views/category/category-delete/category-delete.component';
import {CategoryDisplayComponent} from './views/category/category-display/category-display.component';

@NgModule({
    declarations: [
        AppComponent,
        DocumentCreateComponent,
        DocumentUpdateComponent,
        DocumentListComponent,
        DocumentDeleteComponent,
        CategoryListComponent,
        CategoryUpdateComponent,
        CategoryCreateComponent,
        CategoryDeleteComponent,
        CategoryDisplayComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, {enableTracing: true}),
        FormsModule
    ],
    providers: [
        LibService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
