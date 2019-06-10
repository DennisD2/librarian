import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {XDocument} from "../../../model/XDocument";
import {LibService} from "../../../services/lib.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  xdoc: XDocument = new class implements XDocument {
    id: '';
    location: '';
    publishedYear: 0;
    title: '';
    _links: null;
    resolvedCategories: [];
  };

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected libService: LibService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("Id from param map: " + id);
    let self = this;
    this.libService.getDocument(id).subscribe(doc => {
      self.xdoc = doc;
      self.xdoc.id = id;
      console.log("doc: " + JSON.stringify(self.xdoc));
    });
  }

  public cancel_view(): void {
    console.log("cancel delete.");
    this.router.navigateByUrl('');
  }

  public delete(): void {
    console.log("delete!")
    let self = this;
    this.libService.deleteDocument(self.xdoc).subscribe(data => {
      console.log("deleted doc: " + JSON.stringify(self.xdoc));
    });
    this.router.navigateByUrl('' );
  }

}
