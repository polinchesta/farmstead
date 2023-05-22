import {configureStore} from '@reduxjs/toolkit';
import userReducer from './auth/authSlice';
import settingsReducer from './settings/settingsSlice';
import productsReducer from './products/productsSlice';
import farmsteadReducer from './farmstead/farmsteadSlice';
import farmsteadsReducer from './farmsteads/farmsteadsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
        products: productsReducer,
        farmstead: farmsteadReducer,
        farmsteads: farmsteadsReducer,
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>