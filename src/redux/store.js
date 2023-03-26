import {configureStore} from "@reduxjs/toolkit";
import {itemsReducer} from "./slices/items";

const store = configureStore({
    reducer: {
        items: itemsReducer,
    },
});

export default store;