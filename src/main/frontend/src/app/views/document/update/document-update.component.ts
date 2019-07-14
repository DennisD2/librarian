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
    oldCategories = [];
    newCategories = [];

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
            // initialize array for later comparisation
            self.oldCategories = [];
            doc.categories.forEach( d => self.oldCategories.push(d));
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
        this.xdoc.categories.forEach( d => self.newCategories.push(d));
        this.xdoc.categories = [];
        this.libService.updateOrCreateDocument(self.xdoc).subscribe(doc => {
            self.updateCategories();
            console.log("updated doc: " + JSON.stringify(doc));
        });
        this.router.navigateByUrl('');
    }

    private updateCategories() {
        // Check for removed categories
        this.oldCategories.forEach(oldCat => {
                //console.log("Old cat: " + JSON.stringify(oldCat));
                if (!(this.newCategories.indexOf(oldCat) > -1)) {
                    // delete
                    console.log("Delete cat: " + oldCat);
                }
            }
        );
        // Check for new categories
        this.newCategories.forEach(newCat => {
                if (!(this.oldCategories.indexOf(newCat) > -1)) {
                    // add
                    console.log("Add cat: " + newCat);
                    this.libService.addCategory(this.xdoc, newCat, this.allCategories).subscribe(data => {
                        console.log("updateCategories returns: " + data);
                    });
                }
            }
        );
    }
}
