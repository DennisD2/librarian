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
        categories: [];
        _links: null;
    };
    oldCategories = [];

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
            // initialize array for later comparisation
            self.oldCategories = doc.categories.map(x => Object.assign({}, x));
        });
    }

    public cancel_view(): void {
        console.log("cancel update.")
        this.router.navigateByUrl('');
    }

    public update(): void {
        console.log("update!")
        console.log("updated doc: " + JSON.stringify(this.xdoc));

        let self = this;
        this.libService.updateOrCreateDocument(self.xdoc).subscribe(doc => {
            console.log("updated doc: " + JSON.stringify(doc));
        });
        // Check for removed categories
        this.oldCategories.forEach(oldCat => {
                if (!(self.xdoc.categories.indexOf(oldCat) > -1)) {
                    // delete
                    console.log("Delete cat: " + oldCat);
                }
            }
        );
        // Check for new categories
        this.xdoc.categories.forEach(newCat => {
                if (!(self.oldCategories.indexOf(newCat) > -1)) {
                    // add
                    console.log("Add cat: " + newCat);
                }
            }
        );
        this.router.navigateByUrl('');
    }

}
