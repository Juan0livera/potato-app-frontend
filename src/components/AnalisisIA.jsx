import React, { useState } from 'react'
import { analizarFoodApi } from '../services/AiFoodServices';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/esm/Button';
import Alert from "react-bootstrap/Alert";

const AnalisisIA = ({food}) => {
    const [resultadoIa, setResultadoIa] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorIa , setErrorIa] = useState("");
    const [analizado, setAnalizado] = useState(false);

    const analizarFood = async () => {

        setLoading(true);
        setResultadoIa("");
        setErrorIa("");

        try{
            const resultado = await analizarFoodApi(food.id)
            setResultadoIa(resultado.analysis)
            setAnalizado(true);
        }catch(error){

            setErrorIa("El análisis con IA no está disponible en este momento.");
        }finally {
            setLoading(false);
        }

    }

    return (
        <div className="food-analysis">
            <Button  
                className="btn-orange"
                onClick={analizarFood}
                disabled={loading || analizado}
            >
                {analizado ? "Alimento analizado" : "Analizar con IA"}
            </Button>

            {loading && (
                <div className="loading-status" role="status">
                    <Spinner size="sm"/>

                    <span>
                        Analizando alimento
                    </span>
                </div>
            )}

            {resultadoIa  && (
                <Alert variant="success" role="status">
                    <strong className="d-block mb-1">Análisis completado</strong>
                    {resultadoIa}
                </Alert>
            )}

            {errorIa && (
                <Alert variant="warning">
                    {errorIa}
                </Alert>
            )}
        </div>
    )
}

export default AnalisisIA
