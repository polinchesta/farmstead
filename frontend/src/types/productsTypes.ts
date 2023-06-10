export interface ProductType {
    id: number;
    img: string;
    price: string;
    address: string;
    title: string;
    number: string;
    count: string;
    t: any;
}

/* export interface CreatePostType extends Omit<ProductType, "id"> {} */

export interface ProductsFilterType {
    sortField: string;
    query: string;
    limit: number;
    page: number;
    minPrice?: number; 
    maxPrice?: number;
    rajon?: string;
    sortOrder?: "asc" | "desc";
}
