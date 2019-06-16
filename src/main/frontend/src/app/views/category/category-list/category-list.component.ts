import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LibService} from "../../../services/lib.service";
import {XCategory} from "../../../model/XCategory";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    title: string = 'List Categories';
    urlPrefix: string = 'cat';
    categories: XCategory[] = null;

    constructor(protected libService: LibService,
                protected router: Router) {
    }

    ngOnInit() {
        const self = this;
        this.libService.getAllCategories().subscribe(cats => {
            self.categories = cats;
        });
    }

    public back(): void {
        this.router.navigateByUrl('');
    }

    public create(): void {
        this.router.navigateByUrl(this.urlPrefix + '/create');
    }

    public update(index: number): void {
        console.log('id from button event: ' + index);
        let remote_id = this.getRemoteId(this.categories[index]._links['self'].href);
        this.router.navigateByUrl(this.urlPrefix + '/update/' + remote_id);
    }

    // Calculate remote id from self URL string
    // TODO : doublette
    protected getRemoteId(selfUrl: string): string {
        let parts = selfUrl.split("/");
        let id = parts[parts.length - 1];
        console.log("remote id: " + id);
        return id;
    }

}
