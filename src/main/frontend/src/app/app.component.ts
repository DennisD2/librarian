import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { LibService } from './services/lib.service';
import { XDocument } from './model/XDocument';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: String = 'Library';
  xdocs: XDocument[] = null;

  constructor(protected libService: LibService,
              protected router: Router) {
    const self = this;
    libService.getXDocsSvc().subscribe(docs => {
      self.xdocs = docs;
    });
  }

  public update(): void {
    console.log("update!")
    this.router.navigateByUrl('update');
    return ;
  }

}
