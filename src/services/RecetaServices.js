import api from "./apiServices"

export const buscarRecetasApi = async (ingrediente) => {
    const response = await api.get("/public/recipes", {
        params: {
            ingredient: ingrediente
        }
    });

    return response.data;
};