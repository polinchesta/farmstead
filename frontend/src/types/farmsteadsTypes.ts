interface CommentType {
    id: number;
    author: string;
    content: string;
}

interface ImageType {
    img: string;
}

export interface FarmsteadsFilterType {
    sortField: string;
    query: string;
    limit: number;
    page: number;
}
export interface FarmsteadsType {
    text: string;
    textAll: string;
    url: string;
    titleVideo: string;
    id: number;
    img: string;
    title: string;
    t: any;
    longitude: number;
    house: string;
    place: string;
    price: string;
    contact: string;
    email: string;
    top: number;
    latitude: number;
    image: Array <ImageType>
    comments: Array<CommentType>
}