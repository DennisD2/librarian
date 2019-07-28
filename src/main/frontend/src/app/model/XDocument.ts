import {XLink} from "./XLink";

export interface XDocument {
    id: string;
    title: string;
    authors: string;
    publishedYear: number;
    location: string;
    categories: string[];
    timestamp: string;
    _links: XLink[];
}

export function newXDocument() : XDocument {
    let doc : XDocument = new class implements XDocument {
        id: '';
        location: '';
        publishedYear: 0;
        title: '';
        authors: '';
        timestamp: '';
        categories: [];
        _links: null;
    };
    return doc;
}

/*
    {
        "title" : "HP-75C FORTH",
        "publishedYear" : 1983,
        "location" : "http://raspberrypi/doclib/software/75Forth.pdf",
        "authors" : "Cassady, John",
        "_embedded" : {
        "categories" : [ {
                "category" : "Hardware"
            }, {
                "category" : "Software"
            }, {
                "category" : "History"
            } ]
        },
        "_links" : {
        "self" : {
            "href" : "http://localhost:8080/documents/4"
        },
        "document" : {
            "href" : "http://localhost:8080/documents/4"
        },
        "categories" : {
            "href" : "http://localhost:8080/documents/4/categories"
        }
    }
    }

*/