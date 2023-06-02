export interface FarmsteadsType {
    textAll: string;
    url: string;
    titleVideo: string;
    id: number;
    img: string;
    title: string;
    t: any;
    image: {
        img: string;
    }[];
    coordinate?: undefined;
}

export interface FarmsteadsFilterType {
    sortField: string;
    query: string;
    limit: number;
    page: number;
}
