import {configureStore} from "@reduxjs/toolkit";
import {itemsReducer} from "./slices/items";
import {authReducer} from "./slices/auth";

const store = configureStore({
    reducer: {
        items: itemsReducer,
        auth: authReducer,
    },
});

export default store;