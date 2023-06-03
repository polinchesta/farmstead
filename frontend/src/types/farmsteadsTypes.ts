export interface FarmsteadsType {
    textAll: string;
    url: string;
    titleVideo: string;
    id: number;
    img: string;
    title: string;
    t: any;
    longitude:string;
    latitude:string;
    image: {
        img: string;
    }[];
}

export interface FarmsteadsFilterType {
    sortField: string;
    query: string;
    limit: number;
    page: number;
}
