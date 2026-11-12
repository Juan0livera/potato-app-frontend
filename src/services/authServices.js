import axios from "axios";
import api from "./apiServices"




export const loginApi = async (dataLogin) => {
    const resultado = await api.post("auth/login", dataLogin);
    return resultado.data;
}

export const registroApi = async (dataRegistro) => {
    const resultado = await api.post("auth/register", dataRegistro)
    console.log("Registro API:", resultado.data);
    return resultado.data;
}


export const logoutApi = async (logoutApi) => {
    const resultado = await api.post()
}



