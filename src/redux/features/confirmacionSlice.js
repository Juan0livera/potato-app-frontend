import { createSlice } from '@reduxjs/toolkit';

const initialState = { mostrar: false, tipo: '', id: null, descripcion: '' };

const confirmacionSlice = createSlice({
    name: 'confirmacion',
    initialState,
    reducers: {
        abrirConfirmacion: (state, action) => {
            return { ...action.payload, mostrar: true };
        },
        cerrarConfirmacion: () => initialState
    }
});

export const { abrirConfirmacion, cerrarConfirmacion } = confirmacionSlice.actions;
export default confirmacionSlice.reducer;
