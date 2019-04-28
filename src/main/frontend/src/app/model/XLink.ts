
/*
"_links" : {
        "self" : {
          "href" : "http://localhost:8080/documents/2"
        },
        "document" : {
          "href" : "http://localhost:8080/documents/2"
        }
      }
 */

export interface XHref {
    href: string;
}

export interface XLink {
    name: string;
    ref: XHref;
}