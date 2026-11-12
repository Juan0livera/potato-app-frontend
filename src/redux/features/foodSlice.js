import { createSlice } from '@reduxjs/toolkit'

const initialState = [];


const foodSlice = createSlice({
    name : "foodSlice",
    initialState,
    reducers: {
        crearFoodSlice : (state, action) =>{
            const food = action.payload;
            state.push(food);
        },

        cargarFoodSlice : (state, action) => {
            const listaFood = action.payload;
            return listaFood
        },

        borrarFoodSlice : (state , action ) => {
            const id = action.payload;
            return state.filter(food => food.id !== id);
        },


        updateFoodSlice : (state, action) => {
            const foodAcutalizado = action.payload;

            const index = state.findIndex(
                food => food.id === foodAcutalizado.id
            );

            if(index !== -1){
                state[index] = foodAcutalizado;
            }
        },

        limpiarFoodSlice : (state, action) => {
            return [];
        }
    }
})


export const {crearFoodSlice, cargarFoodSlice, borrarFoodSlice, updateFoodSlice, limpiarFoodSlice} = foodSlice.actions;
export default foodSlice.reducer;