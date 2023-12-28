import { configureStore } from '@reduxjs/toolkit';
import { cartReducers } from './slices/cartSlice';
import { authReducers } from './slices/authSlice';

export const store = configureStore({
    reducer: { cartReducers, authReducers },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
