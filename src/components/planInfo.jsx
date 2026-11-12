import React from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useState } from 'react';
import {getMyFoodCountApi} from '../services/foodServices'

const planInfo = () => {


    const usuario = useSelector(
        state => state.userSlice
    )


    const [cantidadFoods, setCantidadFoods] = useState(0);

    useEffect(() => {
        const cargarCantidad = async () => {
            try {

                const resultado = await getMyFoodCountApi();

                setCantidadFoods(resultado.cantidad);

            } catch (error) {
            }
        };
        cargarCantidad();
    }, []);

    const porcentaje = (cantidadFoods/ 4) * 100;

    return (
        <div>
                <h2>Mi plan</h2>

                <p>
                    Plan actual : <strong>{usuario.plan}</strong>
                </p>

                {usuario.plan === "plus" ? (
                    <>
                        <p>
                            Alimentos creados : {cantidadFoods}/4
                        </p>                    
                    
                        <p>
                            Uso : {Math.min(porcentaje, 100)} %
                        </p>

                        <ProgressBar
                            now={Math.min(porcentaje, 100)}
                            label={`${Math.min(porcentaje, 100)}%`}
                            className="progress-orange"
                        />
                    </>

                ) : (

                    <>
                        <p>Alimentos registrados : {cantidadFoods} </p>

                        <p>
                            Tu plan premium no tiene limite.
                        </p>
                    </>
                    
                    
                )}
        </div>
    )
}

export default planInfo
