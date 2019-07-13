import {XLink} from "./XLink";

export interface XDocument {
    id: string;
    title: string;
    authors: string;
    publishedYear: number;
    location: string;
    categories: string[];
    _links: XLink[];
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