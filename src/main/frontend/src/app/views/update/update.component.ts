import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from "@angular/router";
import {LibService} from "../../services/lib.service";
import {XDocument} from "../../model/XDocument";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  xdoc: XDocument = null;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected libService: LibService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("Id found: " + id);
    let self = this;
    this.libService.getDocument(id).subscribe(doc => {
      self.xdoc = doc;
      console.log("doc: " + self.xdoc);
      self.xdoc.id = id;
    });
  }

  public cancel_view(): void {
    console.log("cancel update.")
    this.router.navigateByUrl('');
  }

  public update(): void {
    console.log("update!")
    let self = this;
    this.libService.updateDocument(self.xdoc).subscribe(doc => {
      self.xdoc = doc;
      console.log("updated doc: " + self.xdoc);
    });
    this.router.navigateByUrl('' );
  }

}
