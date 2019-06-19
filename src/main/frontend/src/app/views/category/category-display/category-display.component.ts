import { Component, OnInit, Input } from '@angular/core';
import {XDocument} from "../../../model/XDocument";

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {
  @Input() doc: XDocument;
  constructor() { }

  ngOnInit() {
  }

}
