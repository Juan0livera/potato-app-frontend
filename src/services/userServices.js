import axios from 'axios';
import api from "./apiServices"

const urlBase = 'https://obligatorio-jet.vercel.app/api/v1'

export const obtenerUsuarioApi = async (signal) => {
    const response = await axios.get(
        `${urlBase}/`, {
            signal : signal
        }
    );

    const usuarios = response.data
    return usuarios
}

// va en auth
// export const crearUsuarioApi = async (usuario) => {
//     const response = await axios.get(
//         `${urlBase/users}`,
//         {
//             usuario : usuario
//         }
//     );

//     return response;
// }

export const upgradeUsuarioApi = async (usuario) => {
    const response = await api.patch(
        `${urlBase}/users/upgrade`,{
            usuario : usuario
        }
    )
    console.log("console log de upgrade" , response.data)
    return response.data;
}



