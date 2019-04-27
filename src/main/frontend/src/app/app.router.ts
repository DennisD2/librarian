import { Routes } from '@angular/router';

import { UpdateComponent} from "./views/update/update.component";
import { ListComponent} from "./views/list/list.component";
import { CreateComponent } from "./views/create/create.component";

// Route Configuration.
export const routes: Routes = [
    { path: 'update/:id', component: UpdateComponent },
    { path: 'create', component: CreateComponent },
    { path: 'list', component: ListComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];
