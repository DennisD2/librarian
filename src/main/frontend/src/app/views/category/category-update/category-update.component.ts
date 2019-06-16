import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LibService} from "../../../services/lib.service";
import {XCategory} from "../../../model/XCategory";

@Component({
    selector: 'app-category-update',
    templateUrl: './category-update.component.html',
    styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
    cat: XCategory = new class implements XCategory {
        id: '';
        category: '';
        _links: null;
    };

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected libService: LibService) {
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        console.log("Id from param map: " + id);
        let self = this;
        this.libService.getCategory(id).subscribe(cat => {
            self.cat = cat;
            console.log("doc: " + JSON.stringify(self.cat));
            self.cat.id = id;
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
        this.libService.updateOrCreateCategory(self.cat).subscribe(doc => {
            self.cat = doc;
            console.log("updated doc: " + JSON.stringify(self.cat));
        });
        this.router.navigateByUrl('');
    }
}
