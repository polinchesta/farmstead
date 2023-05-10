import axios from "axios";
import { ProductsFilterType, ProductType } from "../../types/productsTypes";

const getProductsList = async (filter: ProductsFilterType) => {
   await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios<ProductType[]>({
        method: "GET",
        url: "http://localhost:3001/products",
        params: {
            _sort: filter.sortField,
            q: filter.query,
            _page: filter.page,
            _limit: filter.limit,
        },
    });
};

export default getProductsList;
