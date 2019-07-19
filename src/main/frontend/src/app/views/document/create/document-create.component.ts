import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {XDocument} from "../../../model/XDocument";

import {LibService} from "../../../services/lib.service";

@Component({
    selector: 'app-create',
    templateUrl: './document-create.component.html',
    styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {
    title: string = 'Create Document';
    xdoc: XDocument = new class implements XDocument {
        id: '';
        location: '';
        publishedYear: 0;
        title: '';
        authors: '';
        categories: [];
        _links: null;
    };

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected libService: LibService) {
    }

    ngOnInit() {
    }

    public cancel_view(): void {
        console.log("cancel create.")
        this.router.navigateByUrl('');
    }

    public create(): void {
        console.log("create: " + JSON.stringify(this.xdoc));
        let self = this;
        // on creation, doc has 'id==0'
        self.xdoc.id = '0';
        this.libService.createDocument(self.xdoc).subscribe(doc => {
            self.xdoc = doc;
            console.log("created doc: " + JSON.stringify(self.xdoc));
        });
        this.router.navigateByUrl('');
    }

}
