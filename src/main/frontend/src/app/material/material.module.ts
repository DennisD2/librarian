import {NgModule} from '@angular/core';

import {
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatTableModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule
} from '@angular/material';

@NgModule({
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule, MatInputModule
    ],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule, MatInputModule
    ]
})
export class MaterialModule {
}
