import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import useError from '../hooks/useError';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cerrarConfirmacion } from '../redux/features/confirmacionSlice';
import { deleteFoodApi } from '../services/foodServices';
import { deleteCategoryApi } from '../services/categoryServices';
import { deleteFoodLogApi } from '../services/foodLogServices';
import { borrarFoodSlice } from '../redux/features/foodSlice';
import { borrarCategorySlice } from '../redux/features/categorySlice';
import { borrarFoodLogSlice } from '../redux/features/foodLogSlice';

const ConfirmacionEliminar = () => {
    const dispatch = useDispatch();
    const { error, manejarError, limpiarError } = useError();
    const [eliminando, setEliminando] = useState(false);
    
    const { mostrar, tipo, id, descripcion } = useSelector(state => state.confirmacionSlice);


    const cerrar = () => {
        limpiarError();
        dispatch(cerrarConfirmacion());
    };

    const confirmar = async () => {
        if (eliminando) return;
        limpiarError();
        setEliminando(true);
        try {
            if (tipo === 'alimento') {
                await deleteFoodApi(id);
                dispatch(borrarFoodSlice(id));
            } else if (tipo === 'categoria') {
                await deleteCategoryApi(id);
                dispatch(borrarCategorySlice(id));
            } else if (tipo === 'registro') {
                await deleteFoodLogApi(id);
                dispatch(borrarFoodLogSlice(id));
            }
            cerrar();
        } catch (error) {
            const mensaje = tipo === 'categoria' && error.response?.status === 409
                ? 'No se puede eliminar la categoría porque tiene alimentos asociados.'
                : 'No se pudo eliminar. Intentá nuevamente.';
            manejarError(error, mensaje);
        } finally {
            setEliminando(false);
        }
    };

    return (
            <Modal show={mostrar} onHide={() => { if (!eliminando) cerrar(); }}
                centered className="delete-confirmation" aria-label="Confirmar eliminación">
                <Modal.Header>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que querés eliminar {descripcion}?
                    {error && <Alert variant="danger" className="mt-3" role="alert">{error}</Alert>}
                </Modal.Body>
                <Modal.Footer className="button-actions">
                    <Button type="button" className="btn-cancel" variant="outline-secondary"
                        autoFocus onClick={cerrar} disabled={eliminando}>No</Button>
                    <Button type="button" className="btn-orange" onClick={confirmar} disabled={eliminando}>
                        {eliminando ? 'Eliminando...' : 'Sí'}
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default ConfirmacionEliminar;
