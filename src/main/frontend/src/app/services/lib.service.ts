import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { XDocument } from '../model/XDocument';


@Injectable({
  providedIn: 'root'
})
export class LibService {
  private baseUrl: string = 'http://localhost:8080';
  private documentUrl: string = this.baseUrl + '/documents';
  //private documentUrl: string = this.baseUrl + '/document';

  constructor(protected http:  HttpClient) {
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // return Promise.reject(error.message || error);
    return Promise.resolve('call failed (status=' + error.status + ', message=' + error.message + ')');
  }

  public getHello(param: string): Observable<string> {
    const serviceUrl = this.baseUrl + '/echo/' + param;
    console.log('Calling service URL ' + serviceUrl);

    return this.http.get<string>(serviceUrl)
    .pipe(catchError((e: any) => this.handleError(e)));
  }

  // READ ALL documents
  public getAllDocuments(): Observable<XDocument[]> {
    const serviceUrl = this.documentUrl;
    console.log('Calling service URL ' + serviceUrl);
    return this.http.get<XDocument[]>(serviceUrl)
        .pipe(map((data: any) => { console.log('Service call result: ' + data); return data._embedded.documents;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }


  // READ single document
  public getDocument(id: string): Observable<XDocument> {
    const serviceUrl = this.documentUrl + '/' + id;
    console.log('Calling service URL ' + serviceUrl);

    return this.http.get<XDocument>(serviceUrl)
        .pipe(map((data: any) => { console.log('Service call result: ' + data); return data;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }

  // UPDATE or CREATE a document
  public updateOrCreateDocument(doc: XDocument) : Observable<XDocument> {
    const serviceUrl = this.documentUrl + '/' + doc.id;
    console.log('Calling service URL ' + serviceUrl);
    const data = JSON.stringify(doc);
    console.log('POST data: ' + data);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<XDocument>(serviceUrl, doc, { headers: headers })
        .pipe(map((data: any) => { console.log('Update call result: ' + data); return data;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }


}
