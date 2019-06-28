import { Component, OnInit, Input } from '@angular/core';
import {XDocument} from "../../../model/XDocument";
import {LibService} from "../../../services/lib.service";

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {
  @Input() doc: XDocument;
  constructor(protected libService: LibService) { }

  ngOnInit() {
      this.libService.getCategories(this.doc).subscribe(categories => {
        this.doc.resolvedCategories = categories;
        console.log("resolvedCategories for " + this.doc.title + ": " + this.doc.resolvedCategories);
      })
  }

}
