import axios from "axios";
import { data } from "react-router-dom";
import api from "./apiServices"

const urlBase = "https://obligatorio-jet.vercel.app/api/v1"



export const crearFoodApi = async (dataFood) => {
    const response = await api.post(`${urlBase}/food`, dataFood )
    return response.data;
}

export const getAllFoodApi = async (filtros ={} , signal) => {
    const response = await api.get(`${urlBase}/food`, {
        params : filtros,
        signal : signal
    })
    return response.data;
}

export const deleteFoodApi = async (id) => {
    await api.delete(`${urlBase}/food/${id}`)
}

export const patchFoodApi = async (id, dataFood) => {
    const response = await api.patch(`${urlBase}/food/${id}`, dataFood)
    return response.data
}

export const getMyFoodCountApi = async () => {
    const response = await api.get(`${urlBase}/food/count/my`);

    return response.data;
};