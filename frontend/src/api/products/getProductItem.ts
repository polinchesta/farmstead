import axios from 'axios';
import { ProductType } from '../../types/productsTypes';

const getProductItem = (id: number) =>
    axios<ProductType>({
        method: 'GET',
        url: `http://localhost:3004/products/${id}`,
    });

export default getProductItem;
