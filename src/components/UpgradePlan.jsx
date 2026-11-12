import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useError from "../hooks/useError";
import { upgradeUsuarioApi } from '../services/userServices';
import { cambiarPlanSlice } from '../redux/features/userSlice';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/esm/Button';

const UpgradePlan = () => {
    const dispatch = useDispatch()
    const { error, manejarError, limpiarError } = useError();

    const usuario = useSelector(
        state => state.userSlice
    )


    const cambiarPlan = async () => {
        limpiarError();

        try {
            const resultado = await upgradeUsuarioApi();


            dispatch(cambiarPlanSlice("premium"));

            // Actualizamos localStorage
            const usuarioGuardado =
                JSON.parse(localStorage.getItem("usuario"));
                usuarioGuardado.plan = "premium";
                localStorage.setItem(
                    "usuario",
                    JSON.stringify(usuarioGuardado)
            );
        } catch (error) {
            manejarError(
                error,
                "No se pudo cambiar el plan"
            );
        }


    }




    return (

        <div>
        
                {usuario.plan === "premium" && (
                        <p className="alert alert-success" role="status"><strong className="d-block mb-1">Plan premium activo</strong>Ya tenés plan premium.</p>
                    )
                }

                {usuario.plan === "plus" && (
                <>
                    <h2>Mejorar Plan</h2>

                    <p>
                        Pasá a premium para registrar alimentos sin límite.
                    </p>

                    <Button 
                        className='btn-orange'
                        onClick={cambiarPlan}>
                        Cambiar a premium
                    </Button>

                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}
            </>
        )}
    </div>
    )
}

export default UpgradePlan
