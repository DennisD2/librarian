import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document-display',
  templateUrl: './document-display.component.html',
  styleUrls: ['./document-display.component.css']
})
export class DocumentDisplayComponent implements OnInit {
  @Input() docUrl: string;
  @Input() zoom: number;
  @Input() rotation: number;
  @Input() page: number;

  constructor() {
  }

  ngOnInit() {
  }

  public nextPage(): void {
    console.log("next page!")
    this.page++;
  }

  public previousPage(): void {
    console.log("prev page!");
    if (this.page > 0) {
      this.page--;
    }
  }

  public rotateRight(): void {
    console.log("rotate right!");
      this.rotation += 90;
  }

  public zoomIn(): void {
    this.zoom += 0.1;
    console.log("zoom in to " + this.zoom);
  }

  public zoomOut(): void {
    if (this.zoom > 0.11) {
      this.zoom -= 0.1;
    }
    console.log("zoom out to " + this.zoom);
  }
}
