import {createSlice} from "@reduxjs/toolkit";

export interface IItem {
    id: number;
    name: string;
    price: number;
    description: string;
}

export const itemsSlice = createSlice({
    name: "items",
    initialState: [],
    reducers: {
        setItems: (state: any, action) => {
            state = action.payload;
            return state;
        },
        deleteItemById: (state: any, action) => {
            state = state.slice(action.payload + 1);
            return state;
        },
    },
});

export const {setItems, deleteItemById} = itemsSlice.actions;

export const items = (state: any) => state.items;

export default itemsSlice.reducer;