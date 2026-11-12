import {createSlice} from '@reduxjs/toolkit'


const initialState = [];


const categorySlice = createSlice({
        name : "categorySlice",
        initialState,
        reducers :{

            createCategorySlice : (state, action) => {
                const categoria = action.payload;
                state.push(categoria);
            },

            cargarCategorySlice : (state, action) => {
                const listaCategory = action.payload;
                
                return listaCategory;
            },


            updateCategorySlice : (state, action) => {
                const categoriaActualizada = action.payload;
                const index = state.findIndex(categoria => categoria.id === categoriaActualizada.id);
                if (index !== -1) {
                    state[index] = categoriaActualizada;
                }
            },

            borrarCategorySlice : (state, action) => {
                const id = action.payload;
                return state.filter(c => c.id !== id);
            }

            



        }
    }
)


export const { createCategorySlice, cargarCategorySlice, borrarCategorySlice, updateCategorySlice } = categorySlice.actions;
export default categorySlice.reducer;
