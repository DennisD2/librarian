import {Routes} from '@angular/router';

import {DocumentCreateComponent} from "./views/document/create/document-create.component";
import {DocumentUpdateComponent} from "./views/document/update/document-update.component";
import {DocumentListComponent} from "./views/document/list/document-list.component";
import {DocumentDeleteComponent} from "./views/document/delete/document-delete.component";

import {CategoryCreateComponent} from "./views/category/category-create/category-create.component";
import {CategoryUpdateComponent} from "./views/category/category-update/category-update.component";
import {CategoryListComponent} from "./views/category/category-list/category-list.component";
import {CategoryDeleteComponent} from "./views/category/category-delete/category-delete.component";
import {FsOrphansComponent} from "./views/meta/fs-orphans/fs-orphans.component";
import {DbOrphansComponent} from "./views/meta/db-orphans/db-orphans.component";
import {DoublettesComponent} from "./views/meta/doublettes/doublettes.component";

// Router configuration.
export const routes: Routes = [
    {path: 'doc/create', component: DocumentCreateComponent},
    {path: 'doc/update/:id', component: DocumentUpdateComponent},
    {path: 'doc/list', component: DocumentListComponent},
    {path: 'doc/delete/:id', component: DocumentDeleteComponent},

    {path: 'cat/create', component: CategoryCreateComponent},
    {path: 'cat/update/:id', component: CategoryUpdateComponent},
    {path: 'cat/list', component: CategoryListComponent},
    {path: 'cat/delete/:id', component: CategoryDeleteComponent},

    {path: 'metainfo/fsorphans', component: FsOrphansComponent},
    {path: 'metainfo/dborphans', component: DbOrphansComponent},
    {path: 'metainfo/doublettes', component: DoublettesComponent},

    {path: '', redirectTo: 'doc/list', pathMatch: 'full'},
];
