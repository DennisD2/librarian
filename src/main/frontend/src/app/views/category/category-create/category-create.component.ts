import {Component, OnInit} from '@angular/core';
import {XCategory} from "../../../model/XCategory";
import {ActivatedRoute, Router} from "@angular/router";
import {LibService} from "../../../services/lib.service";

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
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
    }

    public cancel_view(): void {
        console.log("cancel create.")
        this.router.navigateByUrl('');
    }

    public create(): void {
        console.log("create: " + JSON.stringify(this.cat));
        let self = this;
        // create is 'update and id==0'
        self.cat.id = '0';
        this.libService.updateOrCreateCategory(self.cat).subscribe(doc => {
            self.cat = doc;
            console.log("created doc: " + JSON.stringify(self.cat));
        });
        this.router.navigateByUrl('');
    }

}
