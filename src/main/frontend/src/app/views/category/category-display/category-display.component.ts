import { Component, OnInit, Input } from '@angular/core';
import {XDocument} from "../../../model/XDocument";
import {LibService} from "../../../services/lib.service";
import {XCategory} from "../../../model/XCategory";

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {
  @Input() doc: XDocument;
  @Input() editMode: boolean;

  allCategories: XCategory[] = null;

  constructor(protected libService: LibService) {
  }

  ngOnInit() {
    if (this.editMode) {
      let self = this;
      self.libService.getAllCategories().subscribe(cats => {
        self.allCategories = cats;
      });
    }
    if (this.doc == null) {
      console.log('Cannot get categories now, because this.doc is still null');
      return;
    }
    let self = this;
    let data = JSON.stringify(this.doc);
    console.log('POST data: ' + data);
    self.libService.getCategories(this.doc).subscribe(categories => {
        self.doc.resolvedCategories = categories;
        console.log("resolvedCategories for " + self.doc.title + ": " + self.doc.resolvedCategories);
    })
  }

  public containsCategory(s: string) : boolean {
    if (this.doc == null || this.doc.resolvedCategories == null) {
      return false;
    }
    return (this.doc.resolvedCategories.indexOf(s) > -1);
  }

  public removeCategory(s: string) : void {
    console.log("Remove category: " + s);
    let index = this.doc.resolvedCategories.indexOf(s);
    if (index >= 0) {
      this.doc.resolvedCategories.splice(index, 1);
    }
  }

  public addCategory(s: string) : void {
    console.log("Add category: " + s);
      this.doc.resolvedCategories.push(s);

  }

}
