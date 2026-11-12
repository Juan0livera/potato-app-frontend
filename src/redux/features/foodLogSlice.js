import {createSlice} from '@reduxjs/toolkit'


const initialState = [];

const foodLogSlice = createSlice({
    name: "foodLogSlice",
    initialState,

    reducers: {

        crearFoodLogSlice: (state, action) => {
            const food = action.payload
            state.push(food);
        },

        cargarFoodLogSlice : (state, action) => {
            return action.payload;
        },

        borrarFoodLogSlice : (state, action) => {
            const id = action.payload;
            return state.filter(food => food.id !== id);
        },

        
        limpiarFoodLogSlice : (state, action) => {
            return [];
        }
    }
})




export const {crearFoodLogSlice, cargarFoodLogSlice, borrarFoodLogSlice, limpiarFoodLogSlice} = foodLogSlice.actions
export default foodLogSlice.reducer;
