import { Routes, RouterModule } from '@angular/router';

import { UpdateComponent} from "./views/update/update.component";
import { ListComponent} from "./views/list/list.component";

// Route Configuration.
export const routes: Routes = [
    { path: 'update/:id', component: UpdateComponent },
    { path: 'list', component: ListComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];
