import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected router: Router) { }

  ngOnInit() {
    //this.hero$ = this.route.paramMap.pipe(
    //    switchMap((params: ParamMap) =>
    //        this.service.getHero(params.get('id')))
    let id = this.route.snapshot.paramMap.get('id');
    console.log("Id found: " + id);

  }

  public remove_view(): void {
    console.log("remove view!")
    this.router.navigateByUrl('');
    return ;
  }

  public update(): void {
    console.log("update!")
    this.router.navigateByUrl('update' );
    return ;
  }

}
