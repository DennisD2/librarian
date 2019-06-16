import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {XDocument} from "../../../model/XDocument";
import {LibService} from "../../../services/lib.service";

@Component({
    selector: 'app-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
    title: string = 'List';
    urlPrefix: string = 'cat';
    xdocs: XDocument[] = null;

    constructor(protected libService: LibService,
                protected router: Router) {
    }

    ngOnInit() {
        const self = this;
        this.libService.getAllDocuments().subscribe(docs => {
            self.xdocs = docs;
            self.loadCategories();
        });
    }

    public loadCategories(): void {
        this.xdocs.forEach(xdoc => {
            this.libService.getCategories(xdoc).subscribe(categories => {
                xdoc.resolvedCategories = categories;
            })
        });
    }

    public create(): void {
        this.router.navigateByUrl(this.urlPrefix + '/create');
    }

    public update(index: number): void {
        console.log('id from button event: ' + index);
        let remote_id = this.getRemoteId(this.xdocs[index]._links['self'].href);
        this.router.navigateByUrl(this.urlPrefix + '/update/' + remote_id);
    }

    public delete(index: number): void {
        console.log('id from button event: ' + index);
        let remote_id = this.getRemoteId(this.xdocs[index]._links['self'].href);
        this.router.navigateByUrl(this.urlPrefix + '/delete/' + remote_id);
    }

    public categories(): void {
        this.router.navigateByUrl(this.urlPrefix + '/list');
    }

    // Calculate remote id from self URL string
    protected getRemoteId(selfUrl: string): string {
        let parts = selfUrl.split("/");
        let id = parts[parts.length - 1];
        console.log("remote id: " + id);
        return id;
    }

}
