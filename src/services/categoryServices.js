import { data } from "react-router-dom"
import api from "./apiServices"


const urlBase = "https://obligatorio-jet.vercel.app/api/v1"

export const createCategoryApi = async (dataCategory) => {
    const response = await api.post(`${urlBase}/category`, dataCategory)
    return response.data
}

export const getAllCategoriesApi = async (signal) => {
    const response = await api.get(`${urlBase}/category`,{
        signal : signal
    })
    return response.data;
}

export const deleteCategoryApi = async (id) => {
    await api.delete(`${urlBase}/category/${id}`)
}

export const patchCategoryApi = async (id, dataCategory) => {
    const response = await api.patch(`${urlBase}/category/${id}`, dataCategory);
    return response.data;
}
