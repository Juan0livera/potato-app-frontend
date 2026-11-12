import { createSlice } from "@reduxjs/toolkit";

const foodOptionsSlice = createSlice({
    name: "foodOptionsSlice",

    initialState: [],

    reducers: {

        cargarFoodOptionsSlice: (state, action) => {
            return action.payload;
        },

        limpiarFoodOptionsSlice: () => {
            return [];
        }
    }
});

export const {
    cargarFoodOptionsSlice,
    limpiarFoodOptionsSlice
} = foodOptionsSlice.actions;

export default foodOptionsSlice.reducer;