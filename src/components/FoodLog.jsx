import React, { use, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux'
import {useState} from 'react'
import { createFoodLogApi, getAllFoodLogsApi } from '../services/foodLogServices'
import { crearFoodLogSlice, cargarFoodLogSlice } from '../redux/features/foodLogSlice'
import { getAllFoodApi } from '../services/foodServices'
import { cargarFoodSlice } from '../redux/features/foodSlice'
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';
import useError from '../hooks/useError';

const FoodLog = () => {
    const dispatch = useDispatch();
    const { error, manejarError, limpiarError } = useError();

    const [valores, setValores] = useState({
        "foodName" : "",
        "meal" : "",
        "quantity" : ""
    })


    const listaFoods = useSelector(
        state => state.foodOptionsSlice
    );

    const handleChange = (evento) => {
        const auxValores = {...valores};

        const name = evento.target.name;
        const value = evento.target.value;

        auxValores[name] = value;

        setValores(auxValores);
    }

    const onSubmit = async (evento) => {
        evento.preventDefault();
        limpiarError();
  
        try{
            //const resultado = await createFoodLogApi(valores)
            await createFoodLogApi(valores);
            const foodLogsActualizados = await getAllFoodLogsApi();

            //dispatch(crearFoodLogSlice(resultado));
            dispatch(cargarFoodLogSlice(foodLogsActualizados));

            setValores({
                foodName: "",
                meal: "",
                quantity: ""
            });
        } catch (error) {
            manejarError(error, 'No se pudo completar el registro de la comida.');
        }
    }


    

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Ingresar Comida</h1>

                <Form.Label>Ingresa la comida de hoy:</Form.Label>
                <Form.Select name="foodName" value={valores.foodMeal} onChange={handleChange}>
                    <option value="">Seleccionar una comida</option>
                    {listaFoods.map(food => (
                        <option key={food.id} value={food.name}> {food.name} </option>
                    ))}
                </Form.Select>


                <Form.Label>Orden de comida</Form.Label>
                <Form.Select name='meal' value={valores.meal} onChange={handleChange}>
                    <option value="">Seleccionar orden de Comida</option>
                    <option value="breakfast">Desayuno</option>
                    <option value="lunch">Almuerzo</option>
                    <option value="dinner">Cena</option>
                    <option value="snack">Snack</option>
                    <option value="other">Otra</option>
                </Form.Select>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control type='number' name='quantity' value={valores.quantity} 
                placeholder='100g, 200g, 300g...' onChange={handleChange}></Form.Control>
                {/* <Form.Label>Fecha de consumida</Form.Label>
                <Form.Control type='datetime-local' name='consumedAt' value={valores.consumedAt} onChange={handleChange}></Form.Control> */}

                <Button className="btn-orange" type='submit'>Ingresar</Button>
                {error && <Alert variant="danger">{error}</Alert>}
            </form>

        </div>
    )
}

export default FoodLog
