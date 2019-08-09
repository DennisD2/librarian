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
}
