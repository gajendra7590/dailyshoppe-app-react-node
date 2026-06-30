import { configureStore } from "@reduxjs/toolkit";
//SLICES
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
});