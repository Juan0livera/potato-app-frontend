import api from "./apiServices"
export const uploadImageApi = async (archivo) => {

    const formData = new FormData();

    formData.append("image", archivo);

    const response = await api.post(
        "/images/upload",
        formData
    );

    return response.data;
};