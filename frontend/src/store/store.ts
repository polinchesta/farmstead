import {configureStore} from '@reduxjs/toolkit';
import userReducer from './auth/authSlice';
import settingsReducer from './settings/settingsSlice';
import productsReducer from './products/productsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
        products: productsReducer,
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>