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
      // Retrieve all categories
      let self = this;
      self.libService.getAllCategories().subscribe(cats => {
        self.allCategories = cats;
      });
    }
  }

  /**
   * Check for a category, if the document has this category.
   * @param s
   */
  public containsCategory(s: string) : boolean {
    if (this.doc == null || this.doc.categories == null) {
      return false;
    }
    return (this.doc.categories.indexOf(s) > -1);
  }

  public removeCategory(s: string) : void {
    console.log("Remove category: " + s);
    let index = this.doc.categories.indexOf(s);
    if (index >= 0) {
      this.doc.categories.splice(index, 1);
    }
  }

  public addCategory(s: string) : void {
    console.log("Add category: " + s);
      this.doc.categories.push(s);
  }

}
