import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {LibService} from "../../../services/lib.service";
import {XDocument} from "../../../model/XDocument";

@Component({
    selector: 'app-update',
    templateUrl: './document-update.component.html',
    styleUrls: ['./document-update.component.css']
})
export class DocumentUpdateComponent implements OnInit {
    title: string = 'Update Document';
    xdoc: XDocument = new class implements XDocument {
        id: '';
        location: '';
        publishedYear: 0;
        title: '';
        authors: '';
        _links: null;
        resolvedCategories: [];
    };

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected libService: LibService) {
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        console.log("Id from param map: " + id);
        let self = this;
        this.libService.getDocument(id).subscribe(doc => {
            self.xdoc = doc;
            console.log("doc: " + JSON.stringify(self.xdoc));
            self.xdoc.id = id;
            //console.log("doc1: " + JSON.stringify(self.xdoc._links['self'].href));
        });
    }

    public cancel_view(): void {
        console.log("cancel update.")
        this.router.navigateByUrl('');
    }

    public update(): void {
        console.log("update!")
        let self = this;
        this.libService.updateOrCreateDocument(self.xdoc).subscribe(doc => {
            self.xdoc = doc;
            console.log("updated doc: " + JSON.stringify(self.xdoc));
        });
        this.router.navigateByUrl('');
    }

}
