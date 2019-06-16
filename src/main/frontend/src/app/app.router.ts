import { Routes } from '@angular/router';

import { DocumentUpdateComponent} from "./views/document/update/document-update.component";
import { DocumentListComponent} from "./views/document/list/document-list.component";
import { DocumentCreateComponent } from "./views/document/create/document-create.component";
import { DocumentDeleteComponent } from "./views/document/delete/document-delete.component";

import {CategoryListComponent} from "./views/category/category-list/category-list.component";

// Router configuration.
export const routes: Routes = [
    { path: 'doc/create', component: DocumentCreateComponent },
    { path: 'doc/update/:id', component: DocumentUpdateComponent },
    { path: 'doc/delete/:id', component: DocumentDeleteComponent },
    { path: 'doc/list', component: DocumentListComponent },

    { path: 'cat/create', component: CategoryListComponent },
    { path: 'cat/list', component: CategoryListComponent },
    { path: 'cat/update/:id', component: CategoryListComponent },

    { path: '', redirectTo: 'doc/list', pathMatch: 'full' },
];
