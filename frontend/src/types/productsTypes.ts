export interface ProductType {
    id: number;
    img: string;
    price: string;
    adress: string;
    title: string;
    number: string;
    count: string;
}

export interface ProductsFilterType {
    sortField: string;
    query: string;
    limit: number;
    page: number
}
