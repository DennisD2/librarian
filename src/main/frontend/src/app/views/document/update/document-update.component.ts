import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {LibService} from "../../../services/lib.service";
import {XDocument} from "../../../model/XDocument";
import {XCategory} from "../../../model/XCategory";

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
        categories: [];
        _links: null;
    };
    allCategories: XCategory[] = null;

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
            // Retrieve all categories
            // TODO: hand over allCategories to display categories
            self.libService.getAllCategories().subscribe(cats => {
                self.allCategories = cats;
            });
        });
    }

    public cancel_view(): void {
        console.log("cancel update.")
        this.router.navigateByUrl('');
    }

    public update(): void {
        console.log("update!")
        console.log("doc to update: " + JSON.stringify(this.xdoc));

        let self = this;
        this.convertCategoriesToURIs();
        this.libService.updateDocument(self.xdoc).subscribe(doc => {
            console.log("updated doc: " + JSON.stringify(doc));
        });
        this.router.navigateByUrl('');
    }

    private convertCategoriesToURIs() {
        let uris = [];
        this.xdoc.categories.forEach( cat => {
          let index = this.allCategories.map(c => c.category).indexOf(cat);
          uris.push(this.allCategories[index]._links['self'].href);
        })
        this.xdoc.categories = uris;
    }
}
