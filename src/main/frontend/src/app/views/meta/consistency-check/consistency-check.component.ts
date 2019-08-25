import { Component, OnInit } from '@angular/core';
import {LibService} from "../../../services/lib.service";
import {Router} from "@angular/router";
import {Doublette} from "../../../model/Doublette";

import {escape} from "../../../util/helper";

@Component({
  selector: 'app-fs-orphans',
  templateUrl: './consistency-check.component.html',
  styleUrls: ['./consistency-check.component.css']
})
export class ConsistencyCheckComponent implements OnInit {
  title: string = 'Librarian Consistency Check Result';

  fsOrphans: string[] = [];
  dbOrphans: string[] = [];
  doublettes: Doublette[] = [];

  constructor(protected libService: LibService,
              protected router: Router) { }

  ngOnInit() {
    const self = this;
    this.libService.getFSOrphans().subscribe(response => {
      self.fsOrphans = response;
      this.libService.getDBOrphans().subscribe(response => {
        self.dbOrphans = response;
        this.libService.getDoublettes().subscribe(response => {
          self.doublettes = response;
        });
      });
    });
  }

  delete(orphan: string) {
    console.log('Delete FS orphan: ' + orphan);
    this.libService.removeFile(orphan).subscribe(response => {
      console.log('Delete FS orphan returned: ' + response);
      this.router.navigateByUrl('metainfo/analyze');
    });
  }

  create(orphan: string) {
    console.log('Create document from FS orphan: ' + orphan);
    this.router.navigateByUrl('doc/create/' + escape(orphan));
  }

  update(orphan: string) {
    console.log('TODO: Update document in DB: ' + orphan);
    // Get doc for location==orphan
    // Best thing to do is to change REST endpoint to return list<document> instead of <string>
    //this.router.navigateByUrl('doc/update/' + escape(orphan));
  }
}
