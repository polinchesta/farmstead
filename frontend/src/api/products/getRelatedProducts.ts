// api/productsAPI.ts
import axios from 'axios';
import { ProductType } from '../../types/productsTypes';

export const getRelatedProducts = async (id: number): Promise<ProductType[]> => {
  const response = await axios.get<ProductType[]>(`http://localhost:3003/products/${id}/related`);
  return response.data;
};
