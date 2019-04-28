import { Component, OnInit } from '@angular/core';
import { XDocument } from "../../model/XDocument";
import { LibService } from "../../services/lib.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title: String = 'List';
  xdocs: XDocument[] = null;

  constructor(protected libService: LibService,
              protected router: Router) {
  }

  ngOnInit() {
    const self = this;
    this.libService.getAllDocuments().subscribe(docs => {
      self.xdocs = docs;
    });
  }

  public create(): void {
    this.router.navigateByUrl('create');
  }

  public update(index: number): void {
    console.log('id from button event: ' + index);
    let remote_id = this.getRemoteId(this.xdocs[index]._links['self'].href);
    this.router.navigateByUrl('update/' + remote_id );
  }

  public delete(index: number): void {
    console.log('id from button event: ' + index);
    let remote_id = this.getRemoteId(this.xdocs[index]._links['self'].href);
    this.router.navigateByUrl('delete/' + remote_id );
  }

  // Calculate remote id from self URL string
  protected getRemoteId(selfUrl: string): string {
    let parts = selfUrl.split("/");
    let id = parts[parts.length-1];
    console.log("remote id: " + id);
    return id;
  }

}
