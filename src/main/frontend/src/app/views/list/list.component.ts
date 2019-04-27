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

  public update(index: number): void {
    console.log('index: ' + index);
    this.router.navigateByUrl('update/' + index );
    return ;
  }

  ngOnInit() {
    const self = this;
    this.libService.getXDocsSvc().subscribe(docs => {
      self.xdocs = docs;
    });
  }

}
