import { Component } from '@angular/core';

import { HelloService } from './services/hello.service';
import { XDocument } from './model/XDocument';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'mini-ng';
  service_result: String = '(not yet called)';
  xdocs: XDocument[] = null;

  constructor(protected helloService: HelloService) {
      const self = this;
      //helloService.getHello('test101').subscribe(echo => {
      //    self.service_result = echo;
      //});
      //self.xdocs = helloService.getXDocs();
      helloService.getXDocsSvc().subscribe(docs => {
          self.xdocs = docs;
      });
  }
}
