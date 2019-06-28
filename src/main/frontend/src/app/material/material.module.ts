import {NgModule} from '@angular/core';

import {
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatTableModule, MatPaginatorModule
} from '@angular/material';

@NgModule({
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class MaterialModule {
}
