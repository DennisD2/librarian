import {XLink} from "./XLink";

export interface XDocument {
    id: string;
    title: string;
    authors: string;
    publishedYear: number;
    location: string;
    _links: XLink[];

    resolvedCategories: string[];
}