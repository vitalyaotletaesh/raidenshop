import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const {data} = await axios.get('/items');
    return data
});

const initialState = {
    items: {
        components: [],
        status: 'loading',
    },
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.items.status = [];
            state.items.status = 'loading';
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.items.components = action.payload;
            state.items.status = 'loaded';
        },
        [fetchItems.rejected]: (state) => {
            state.items.components = [];
            state.items.status = 'error';
        },
    },
});

export const itemsReducer = itemsSlice.reducer;