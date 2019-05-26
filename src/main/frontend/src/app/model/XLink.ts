
/*
"_links" : {
        "self" : {
          "href" : "http://localhost:8080/documents/2"
        },
        "document" : {
          "href" : "http://localhost:8080/documents/2"
        }
        "categories" : {
          "href" : "http://localhost:8080/document/4/categories"
        }
 */

export interface XHref {
    href: string;
}

export interface XLink {
    name: string;
    ref: XHref;
}