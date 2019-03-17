import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { XDocument } from '../model/XDocument';
import { XDocMock } from '../services/XDocListMock';


@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(protected http:  HttpClient) {
  }

  public getHello(param: string): Observable<string> {
    const serviceUrl = '/echo/' + param;
    console.log('calling service URL ' + serviceUrl);

//    return this.http.get(serviceUrl, {responseType: 'text' as 'json'})
//     .pipe(map((res: string) => res));
    return this.http.get<string>(serviceUrl, {responseType: 'text' as 'json'})
    .pipe(catchError((e: any) => this.handleError(e)));
  }

  public getXDocs(): XDocument[] {
    return XDocMock;
  }

  public getXDocsSvc(): Observable<XDocument[]> {
    const serviceUrl = '/documents';
    console.log('calling service URL ' + serviceUrl);

//    return this.http.get(serviceUrl, {responseType: 'text' as 'json'})
//     .pipe(map((res: string) => res));
    return this.http.get<XDocument[]>(serviceUrl)
        .pipe(map((data: any) => { console.log(data); return data._embedded.documents;}))
        .pipe(catchError((e: any) => this.handleError(e)));
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // return Promise.reject(error.message || error);
    return Promise.resolve('call failed (status=' + error.status + ', message=' + error.message + ')');
  }

}
