import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStore } from '../../interfaces/Auth';

const initialState: AuthStore = {
    isLoggedIn: false,
    isAdmin: false,
    email: null,
    userId: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<AuthStore>) {
            const { email, userId, token, isAdmin } = action.payload;

            state.email = email;
            state.userId = userId;
            state.token = token;
            state.isAdmin = isAdmin;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.email = null;
            state.userId = null;
            state.token = null;
            state.isAdmin = false;
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
