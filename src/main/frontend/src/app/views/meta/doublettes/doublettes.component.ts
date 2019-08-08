import { Component, OnInit } from '@angular/core';
import {LibService} from "../../../services/lib.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doublettes',
  templateUrl: './doublettes.component.html',
  styleUrls: ['./doublettes.component.css']
})
export class DoublettesComponent implements OnInit {
  title: string = 'List of doublette candidates';



  constructor(protected libService: LibService,
              protected router: Router) { }

  ngOnInit() {

  }

}
