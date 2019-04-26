import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(protected router: Router) { }

  ngOnInit() {
  }

  public remove_view(): void {
    console.log("remove view!")
    this.router.navigateByUrl('');
    return ;
  }

  public update(): void {
    console.log("update!")
    this.router.navigateByUrl('update');
    return ;
  }

}
