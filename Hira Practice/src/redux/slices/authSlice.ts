import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../types";
import type { User } from "@/context/types";

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
        restoreSession: (state, action: PayloadAction<{ user: User }>) => {
            const token = localStorage.getItem('token');
            if (token) {
                state.user = action.payload.user;
            }
        },
    },
});



export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;