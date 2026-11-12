import api from "./apiServices"


const urlBase = "https://obligatorio-jet.vercel.app/api/v1"

export const createFoodLogApi = async (dataFoodLog) => {
    const response = await api.post(`${urlBase}/foodLog`, dataFoodLog)
    return response.data;
}


export const getAllFoodLogsApi = async (signal) => {
    const response = await api.get(`${urlBase}/foodLog`, {
        singal : signal
    })
    return response.data
}

export const deleteFoodLogApi = async (id) => {
    await api.delete(`${urlBase}/foodLog/${id}`);
}




