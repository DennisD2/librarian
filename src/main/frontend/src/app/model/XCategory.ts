
/*
{
  "_embedded" : {
    "category" : [ {
      "category" : "Software",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/category/2"
        },
        "category" : {
          "href" : "http://localhost:8080/category/2"
        }
      }
    }, {
      "category" : "History",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/category/3"
        },
        "category" : {
          "href" : "http://localhost:8080/category/3"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/document/4/categories"
    }
  }
}
 */

import {XLink} from "./XLink";

export interface XCategory {
    id: string;
    category: string;
    _links: XLink[];
}