import {Component, Input, OnInit} from '@angular/core';
import {PDFDocumentProxy} from "pdfjs-dist";

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

  private totalPages: number;
  private isLoaded: boolean;
  private pageInput: number;

  constructor() {
  }

  ngOnInit() {
    this.pageInput = this.page;
  }

  public nextPage(): void {
    console.log("next page!")
    this.page++;
    this.pageInput = this.page;
  }

  public previousPage(): void {
    console.log("prev page!");
    if (this.page > 0) {
      this.page--;
      this.pageInput = this.page;
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

  public afterLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
    this.isLoaded = true;
  }

  public newPageValue() {
    console.log("new page value " + this.pageInput );
    this.page = this.pageInput;
  }


  public getContentType(): string {
    const location = this.docUrl.toLowerCase();
    if (location.endsWith(".pdf")) {
      return "pdf";
    }
    this.isLoaded = true;
    if (location.endsWith(".png") || location.endsWith(".jpg") || location.endsWith(".gif")) {
      return "image";
    }
    if (location.endsWith(".html") || location.endsWith(".htm") ) {
      return "html";
    }
    if (location.endsWith(".txt") ) {
      return "text";
    }
  }
}
