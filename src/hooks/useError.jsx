import { useCallback, useState } from "react";

const useError = () => {
    const [error, setError] = useState("");

    const limpiarError = useCallback(() => {
        setError("");
    }, []);

    const manejarError = useCallback((
        err,
        mensajeDefault = "Ocurrió un error"
    ) => {

        const errores = err.response?.data?.errors;

        if (Array.isArray(errores)) {

            const mensaje = errores
                .map(error => error.message)
                .join(" - ");

            setError(mensaje);

            return;
        }

        setError(
            err.response?.data?.message ||
            mensajeDefault
        );
    }, []);

    return {
        error,
        setError,
        limpiarError,
        manejarError
    };
};

export default useError;
