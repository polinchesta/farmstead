import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './auth/authSlice';
import settingsReducer from './settings/settingsSlice';
import productsReducer from './products/productsSlice';
import farmsteadReducer from './farmstead/farmsteadSlice';
import farmsteadsReducer from './farmsteads/farmsteadsSlice';
import relatedProductsReducer from './RelatedProduct/relatedProduct';
import productReducer from './product/productSlice';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  product: productReducer,
  products: productsReducer,
  farmstead: farmsteadReducer,
  farmsteads: farmsteadsReducer,
  relatedProducts: relatedProductsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
