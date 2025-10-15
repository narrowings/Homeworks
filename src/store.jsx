import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import itemsReducer from "./itemSlice";
import { crudSlice } from "./crudSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        items: itemsReducer,
        crud: crudSlice.reducer
    },
})