import {configureStore} from '@reduxjs/toolkit';
import userReducer from './auth/authSlice';
import settingsReducer from './settings/settingsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>