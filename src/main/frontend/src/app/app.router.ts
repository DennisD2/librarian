import { Routes } from '@angular/router';

import { UpdateComponent} from "./views/document/update/update.component";
import { ListComponent} from "./views/document/list/list.component";
import { CreateComponent } from "./views/document/create/create.component";
import { DeleteComponent } from "./views/document/delete/delete.component";

// Route Configuration.
export const routes: Routes = [
    { path: 'create', component: CreateComponent },
    { path: 'update/:id', component: UpdateComponent },
    { path: 'delete/:id', component: DeleteComponent },
    { path: 'list', component: ListComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];
