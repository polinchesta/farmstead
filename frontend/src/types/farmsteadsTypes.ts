export interface FarmsteadsType {
    textAll: string;
    url: string;
    titleVideo: string;
    id: number;
    img: string;
    title: string;
    t: any;
    longitude:number;
    house:string;
    place:string;
    price: string;
    contact:string;
    email:string;
    latitude:number;
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
