import { Component, OnInit } from '@angular/core';
import {XDocument} from "../../model/XDocument";
import {ActivatedRoute, Router} from "@angular/router";
import {LibService} from "../../services/lib.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  xdoc: XDocument = null;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected libService: LibService) { }

  ngOnInit() {
  }

  public cancel_view(): void {
    console.log("cancel create.")
    this.router.navigateByUrl('');
  }

  public create(): void {
    console.log("create!")
    let self = this;
    // create is 'update and no id set'
    this.libService.updateDocument(self.xdoc).subscribe(doc => {
      self.xdoc = doc;
      console.log("created doc: " + self.xdoc);
    });
    this.router.navigateByUrl('' );
  }

}
