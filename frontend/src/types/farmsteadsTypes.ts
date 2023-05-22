export interface FarmsteadType{
  textAll: string;
  img: string;
  url: string;
  titleVideo: string;
  title:string
}

export interface FarmsteadsType {
    id: number;
    img: string;
    title: string;
    farmstead: FarmsteadType[]
    t: any;
}

export interface FarmsteadsFilterType {
    sortField: string;
    query: string;
    limit: number;
    page: number
}
