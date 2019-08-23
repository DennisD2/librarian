import { Component, OnInit } from '@angular/core';
import {LibService} from "../../../services/lib.service";
import {Router} from "@angular/router";
import {Doublette} from "../../../model/Doublette";

@Component({
  selector: 'app-fs-orphans',
  templateUrl: './fs-orphans.component.html',
  styleUrls: ['./fs-orphans.component.css']
})
export class FsOrphansComponent implements OnInit {
  title: string = 'Librarian Analysis Result';

  fsOrphans: string[] = [];
  dbOrphans: string[] = [];
  doublettes: Doublette[] = [];

  urlPrefix: string = 'doc';

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
      this.router.navigateByUrl(this.urlPrefix + '/metainfo/analyze');
    });
  }

  create(orphan: string) {
    console.log('Create document from FS orphan: ' + orphan);
    this.router.navigateByUrl(this.urlPrefix + '/create/' + this.escapePath(orphan));
  }

  escapePath( path: string) : string {
    const escapedPath = path.replace('/', '%3F');
    console.log('Escaped path: ' + escapedPath);
    return escapedPath;
  }
}
