import { useState } from "react";

const useLoading = (estadoInicial = false) => {

    const [loading, setLoading] = useState(estadoInicial);

    const iniciarLoading = () => {
        setLoading(true);
    };

    const terminarLoading = () => {
        setLoading(false);
    };

    const ejecutarConLoading = async (funcion) => {

        iniciarLoading();

        try {
            return await funcion();
        } finally {
            terminarLoading();
        }
    };

    return {
        loading,
        iniciarLoading,
        terminarLoading,
        ejecutarConLoading
    };
};

export default useLoading;