import { Routes } from '@angular/router';

import { UpdateComponent} from "./views/update/update.component";
import { ListComponent} from "./views/list/list.component";
import { CreateComponent } from "./views/create/create.component";
import { DeleteComponent } from "./views/delete/delete.component";

// Route Configuration.
export const routes: Routes = [
    { path: 'create', component: CreateComponent },
    { path: 'update/:id', component: UpdateComponent },
    { path: 'delete/:id', component: DeleteComponent },
    { path: 'list', component: ListComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];
