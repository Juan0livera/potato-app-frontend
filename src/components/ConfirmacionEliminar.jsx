import { useDispatch, useSelector } from 'react-redux';
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
    const { mostrar, tipo, id, descripcion } = useSelector(state => state.confirmacionSlice);
    const cerrar = () => dispatch(cerrarConfirmacion());

    const confirmar = async () => {
        cerrar();
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
        } catch (error) {
        }
    };

    return (
            <Modal show={mostrar} onHide={cerrar}
                centered className="delete-confirmation" aria-label="Confirmar eliminación">
                <Modal.Header>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que querés eliminar {descripcion}?
                </Modal.Body>
                <Modal.Footer className="button-actions">
                    <Button type="button" className="btn-cancel" variant="outline-secondary"
                        autoFocus onClick={cerrar}>No</Button>
                    <Button type="button" className="btn-orange" onClick={confirmar}>
                        Sí
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default ConfirmacionEliminar;
