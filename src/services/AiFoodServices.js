import api from "./apiServices"

export const analizarFoodApi = async (foodId) => {

    const response = await api.get(
        `/ai/food/${foodId}/analysis`
    );

    return response.data;
};