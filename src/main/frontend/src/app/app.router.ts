import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateComponent} from "./views/update/update.component";

// Route Configuration.
export const routes: Routes = [
    { path: 'update', component: UpdateComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' },
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);