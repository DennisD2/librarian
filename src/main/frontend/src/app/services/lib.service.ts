import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {XDocument} from '../model/XDocument';
import {XCategory} from "../model/XCategory";


@Injectable({
    providedIn: 'root'
})
export class LibService {
    private baseUrl: string = 'http://localhost:8080';
    private documentUrl: string = this.baseUrl + '/documents';
    private categoryUrl: string = this.baseUrl + '/categories';

    constructor(protected http: HttpClient) {
    }

    protected handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        // return Promise.reject(error.message || error);
        return Promise.resolve('call failed (status=' + error.status + ', message=' + error.message + ')');
    }

    /**
     * READ ALL documents (GET).
     */
    public getAllDocuments(): Observable<XDocument[]> {
        const serviceUrl = this.documentUrl;
        console.log('READALL service URL ' + serviceUrl);
        return this.http.get<XDocument[]>(serviceUrl)
            .pipe(map((data: any) => {
                //console.log('Service call result: ' + JSON.stringify(data));
                let xdocs : XDocument[] = [];
                data._embedded.documents.forEach( d => {
                    //console.log('doc returned from REST call: ' + JSON.stringify(d));
                    let theDoc = this.createXDocumentFromRESTData(d);
                    xdocs.push(theDoc);
                });
                return xdocs;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

    /**
     * Read a single document (GET).
     * @param id document id to read.
     */
    public getDocument(id: string): Observable<XDocument> {
        const serviceUrl = this.documentUrl + '/' + id;
        console.log('READ service URL ' + serviceUrl);

        return this.http.get<XDocument>(serviceUrl)
            .pipe(map((data: any) => {
                console.log('Service call result: ' + data);
                let theDoc = this.createXDocumentFromRESTData(data);
                console.log('Enriched object: ' + JSON.stringify(theDoc));
                return theDoc;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

    /**
     * Create usable object from REST object.
     * We map the string values from categories into a string array
     * @param restData data to create object from
     * @return new valid object
     */
    private createXDocumentFromRESTData( restData: any) : XDocument {
        let xdoc : XDocument = restData;
        if ("_embedded" in restData) {
            xdoc.categories = restData._embedded.categories.map(cat => cat.category);
        }
        return xdoc;
    }

    /**
     * Create or update a document (PUT).
     * @param doc Document to create or update.
     */
    public updateOrCreateDocument(doc: XDocument): Observable<XDocument> {
        const serviceUrl = this.documentUrl + '/' + doc.id;
        console.log('UPDATE/CREATE service URL ' + serviceUrl);
        const data = JSON.stringify(doc);
        console.log('POST data: ' + data);

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.put<XDocument>(serviceUrl, doc, {headers: headers})
            .pipe(map((data: any) => {
                console.log('Update call result: ' + data);
                return data;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

    /**
     * DELETE a document (DELETE).
     * @param doc Document to delete.
     */
    public deleteDocument(doc: XDocument): Observable<any> {
        const serviceUrl = this.documentUrl + '/' + doc.id;
        console.log('DELETE service URL ' + serviceUrl);

        return this.http.delete(serviceUrl)
            .pipe(map((data: any) => {
                console.log('Delete call result: ' + data);
                return data;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

    /**
     * Get ALL categories (GET).
     */
    public getAllCategories(): Observable<XCategory[]> {
        const serviceUrl = this.categoryUrl;
        console.log('READ ALL CATEGORIES service URL ' + serviceUrl);

        return this.http.get<XCategory[]>(serviceUrl)
            .pipe(map((data: any) => {
                console.log('GET CATEGORIES Service call result: ' + data._embedded.categories);
                return data._embedded.categories;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

    /**
     * Read a single category (GET)
     * @param id Category to read.
     */
    public getCategory(id: string): Observable<XCategory> {
        const serviceUrl = this.categoryUrl + '/' + id;
        console.log('READ service URL ' + serviceUrl);

        return this.http.get<XCategory>(serviceUrl)
            .pipe(map((data: any) => {
                console.log('Service call result: ' + data);
                return data;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

    /**
     * UPDATE or CREATE a category (PUT).
     * @param cat Category to update or create.
     */
    public updateOrCreateCategory(cat: XCategory): Observable<XCategory> {
        const serviceUrl = this.categoryUrl + '/' + cat.id;
        console.log('UPDATE/CREATE service URL ' + serviceUrl);
        const data = JSON.stringify(cat);
        console.log('POST data: ' + data);

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.put<XCategory>(serviceUrl, cat, {headers: headers})
            .pipe(map((data: any) => {
                console.log('Update call result: ' + data);
                return data;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

    public updateCategories( doc: XDocument) : Observable<XDocument> {
        const serviceUrl = doc._links['categories'].href;
        console.log('UPDATE/CREATE cat service URL ' + serviceUrl);
        const data1 = JSON.stringify(doc);
        console.log('POST cat data: ' + data1);
        const data = JSON.stringify(doc.categories);
        console.log('POST cat data: ' + data);

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.put<XCategory>(serviceUrl, doc, {headers: headers})
            .pipe(map((data: any) => {
                console.log('Update cat call result: ' + data);
                return data;
            }))
            .pipe(catchError((e: any) => this.handleError(e)));
    }

}
