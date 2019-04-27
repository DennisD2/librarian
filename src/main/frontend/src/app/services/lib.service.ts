import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { XDocument } from '../model/XDocument';


@Injectable({
  providedIn: 'root'
})
export class LibService {
  baseUrl: string = 'http://localhost:8080';

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

  public getXDocsSvc(): Observable<XDocument[]> {
    const serviceUrl = this.baseUrl + '/documents';
    //const serviceUrl = this.baseUrl + '/documents';
    console.log('Calling service URL ' + serviceUrl);

    return this.http.get<XDocument[]>(serviceUrl)
        .pipe(map((data: any) => { console.log('Service call result: ' + data); return data._embedded.documents;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }

}
