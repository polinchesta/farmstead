import axios from "axios";
import { ProductType } from "../../types/productsTypes";

const getProductsList = () => 
    axios<Array<ProductType>>({
        method: "GET",
        url: 'http://localhost:3001/products'
    });

export default getProductsList;
