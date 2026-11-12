import { createSlice } from '@reduxjs/toolkit'


const initialState = [];

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers : {
        
        cargarUsuariosSlice : (state, action) => {
            const listaUsuarios = action.payload;
            return listaUsuarios;
        },

        crearUsuarioSlice : (state, action) => {
            const usuario = action.payload;
            state.push(usuario);
        },

        cambiarPlanSlice : (state, action) => {
            state.plan = action.payload;
        },

        limpiarUsuarioSlice : () => {
            return initialState;
        }
    }
})

//le pasamos los reducers/acciones a el store.
export const {cargarUsuariosSlice, crearUsuarioSlice, cambiarPlanSlice, limpiarUsuarioSlice} = userSlice.actions;
export default userSlice.reducer;