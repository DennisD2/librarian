import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {newXDocument, XDocument} from "../../../model/XDocument";

import {LibService} from "../../../services/lib.service";

import * as moment from 'moment';

@Component({
    selector: 'app-create',
    templateUrl: './document-create.component.html',
    styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {
    title: string = 'Create Document';
    xdoc: XDocument = newXDocument();
    docRepoBaseUri: string;

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected libService: LibService) {
        let now =  moment(Date.now()).format('YYYY-MM-DD H:m:s');
        this.xdoc.timestamp = now;
    }

    ngOnInit() {
        let self = this;
        // Get BaseURI
        self.libService.getBaseURI().subscribe(baseURI => {
            self.docRepoBaseUri = baseURI;
        });   }

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

    public getContentURI(xdoc: XDocument) : string {
        return this.docRepoBaseUri + xdoc.location;
    }
}
