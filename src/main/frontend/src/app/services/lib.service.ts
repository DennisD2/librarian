import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { XDocument } from '../model/XDocument';
import {XCategory} from "../model/XCategory";


@Injectable({
  providedIn: 'root'
})
export class LibService {
  private baseUrl: string = 'http://localhost:8080';
  private documentUrl: string = this.baseUrl + '/documents';
  private categoryUrl: string = this.baseUrl + '/categories';

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
    console.log('READALL service URL ' + serviceUrl);
    return this.http.get<XDocument[]>(serviceUrl)
         /*.pipe(map((data: any) => { console.log('Service call result: ' + data); return data._embedded.documents;}))*/
        .pipe(map((data: any) => { console.log('Service call result: ' + data); return data._embedded.documents;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }


  // READ single document
  public getDocument(id: string): Observable<XDocument> {
    const serviceUrl = this.documentUrl + '/' + id;
    console.log('READ service URL ' + serviceUrl);

    return this.http.get<XDocument>(serviceUrl)
        .pipe(map((data: any) => { console.log('Service call result: ' + data); return data;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }

  // UPDATE or CREATE a document
  public updateOrCreateDocument(doc: XDocument) : Observable<XDocument> {
    const serviceUrl = this.documentUrl + '/' + doc.id;
    console.log('UPDATE/CREATE service URL ' + serviceUrl);
    const data = JSON.stringify(doc);
    console.log('POST data: ' + data);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<XDocument>(serviceUrl, doc, { headers: headers })
        .pipe(map((data: any) => { console.log('Update call result: ' + data); return data;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }

  // DELETE a document
  public deleteDocument(doc: XDocument) : Observable<any> {
    const serviceUrl = this.documentUrl + '/' + doc.id;
    console.log('DELETE service URL ' + serviceUrl);

    return this.http.delete(serviceUrl)
        .pipe(map((data: any) => { console.log('Delete call result: ' + data); return data;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }

  // Get ALL categories
  public getAllCategories() : Observable<XCategory[]> {
    const serviceUrl =  this.categoryUrl;
    console.log('READ ALL CATEGORIES service URL ' + serviceUrl);

    return this.http.get<XCategory[]>(serviceUrl)
        .pipe(map((data: any) => {
          console.log('GET CATEGORIES Service call result: ' + data._embedded.categories);
          return data._embedded.categories;
        }))
        .pipe(catchError((e: any) => this.handleError(e)));
  }


  // Get categories of a document
  public getCategories(doc: XDocument) : Observable<string[]> {
    // console.log(doc._links['categories'].href);
    const serviceUrl = doc._links['categories'].href;
    console.log('GET CATEGORIES service URL ' + serviceUrl);

    // Map complex returned JSON to simple string array.
    return this.http.get<string[]>(serviceUrl)
        .pipe(map((data: any) => {
          console.log('GET CATEGORIES Service call result: ' + data._embedded.categories);
          let cats : string[] = [];
          data._embedded.categories.forEach( cat => cats.push(cat.category));
          return cats;
        }))
        .pipe(catchError((e: any) => this.handleError(e)));
  }

}
