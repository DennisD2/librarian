import { Routes } from '@angular/router';

import { DocumentUpdateComponent} from "./views/document/update/document-update.component";
import { DocumentListComponent} from "./views/document/list/document-list.component";
import { DocumentCreateComponent } from "./views/document/create/document-create.component";
import { DocumentDeleteComponent } from "./views/document/delete/document-delete.component";

// Route Configuration.
export const routes: Routes = [
    { path: 'create', component: DocumentCreateComponent },
    { path: 'update/:id', component: DocumentUpdateComponent },
    { path: 'delete/:id', component: DocumentDeleteComponent },
    { path: 'list', component: DocumentListComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];
