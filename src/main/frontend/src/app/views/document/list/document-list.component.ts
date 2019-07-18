import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {XDocument} from "../../../model/XDocument";
import {LibService} from "../../../services/lib.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
    selector: 'app-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
    title: string = 'List Documents';
    urlPrefix: string = 'doc';

    displayedColumns = ['title', 'authors', 'publishedYear', 'location', 'categories', 'actions'];
    xdocs: XDocument[] = [];

    dataSource = new MatTableDataSource(this.xdocs);
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(protected libService: LibService,
                protected router: Router) {
        const self = this;
        this.libService.getAllDocuments().subscribe(docs => {
            //console.log('returned from getAllDocuments()');
            //console.log(JSON.stringify(docs));
            self.xdocs = docs;
            self.dataSource.data = self.xdocs;
            self.dataSource.sort = self.sort;
        });
    }

    ngOnInit() {

        this.dataSource.paginator = this.paginator;
    }

    public create(): void {
        this.router.navigateByUrl(this.urlPrefix + '/create');
    }

    public update(xdoc: XDocument): void {
        let remote_id = this.getRemoteId(xdoc._links['self'].href);
        this.router.navigateByUrl(this.urlPrefix + '/update/' + remote_id);
    }

    public delete(xdoc: XDocument): void {
        let remote_id = this.getRemoteId(xdoc._links['self'].href);
        this.router.navigateByUrl(this.urlPrefix + '/delete/' + remote_id);
    }

    public categories(): void {
        // Category handling
        this.router.navigateByUrl('cat/list');
    }

    public rowClicked(xdoc: XDocument): void {
        let remote_id = this.getRemoteId(xdoc._links['self'].href);
        this.router.navigateByUrl(this.urlPrefix + '/update/' + remote_id);
    }

    // Calculate remote id from self URL string
    protected getRemoteId(selfUrl: string): string {
        let parts = selfUrl.split("/");
        let id = parts[parts.length - 1];
        console.log("remote id: " + id);
        return id;
    }

}


