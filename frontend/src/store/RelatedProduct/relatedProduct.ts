import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import { ProductType } from '../../types/productsTypes';
import { getRelatedProducts } from '../../api/products/getRelatedProducts';

interface RelatedProductsState {
  relatedProducts: ProductType[];
  loading: boolean;
  error: string | null;
}

const initialState: RelatedProductsState = {
  relatedProducts: [],
  loading: false,
  error: null,
};

const relatedProductsSlice = createSlice({
  name: 'relatedProducts',
  initialState,
  reducers: {
    fetchRelatedProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRelatedProductsSuccess(state, action: PayloadAction<ProductType[]>) {
      state.relatedProducts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRelatedProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRelatedProductsStart,
  fetchRelatedProductsSuccess,
  fetchRelatedProductsFailure,
} = relatedProductsSlice.actions;

// Async thunk action to fetch related products
export const fetchRelatedProducts = (productId: number): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  dispatch(fetchRelatedProductsStart());

  try {
    const response = await getRelatedProducts(productId);
    dispatch(fetchRelatedProductsSuccess(response as ProductType[]));
  } catch (error) {
    dispatch(fetchRelatedProductsFailure((error as any).message || 'Failed to fetch related products'));
  }
};

export default relatedProductsSlice.reducer;
