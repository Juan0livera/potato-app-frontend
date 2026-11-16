import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Categorias from './Categorias';
import { crearFoodApi } from '../services/foodServices';
import { useDispatch , useSelector} from "react-redux";
import { crearFoodSlice, cargarFoodSlice } from '../redux/features/foodSlice';
import categorySlice from '../redux/features/categorySlice';
import useError from '../hooks/useError';
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/esm/Button';
import { uploadImageApi } from '../services/uploadImageServices';
import { cargarFoodOptionsSlice } from "../redux/features/foodOptionSlice"
/*
El food crea y borra comidas.
*/

const Food = () => {
    const dispatch = useDispatch()
    const {error, manejarError , limpiarError} = useError();
    const [imagen, setImagen] = useState(null);
    const [mensajeExito, setMensajeExito] = useState("");

    const [valores, setValores] = useState({
        "name" : "",
        "calories" : "",
        "protein" : "",
        "carbs" : "",
        "fat" : "",
        "servingSize" : "",
        "category" : ""
    });

    


    const formularioCompleto =
        valores.name &&
        valores.calories &&
        valores.protein &&
        valores.carbs &&
        valores.fat &&
        valores.servingSize &&
        valores.category

    // const formularioValido =
    //     valores.name.trim() !== "" &&
    //     Number(valores.calories) >= 0 &&
    //     Number(valores.protein) >= 0 &&
    //     Number(valores.carbs) >= 0  &&
    //     Number(valores.fat) >= 0 &&
    //     Number(valores.servingSize) >= 1 &&
    //     valores.category !== "";

    

    const handleChange = (evento) => {
        const auxValores = {...valores};

        //obtenemos el nombre del input
        const name = evento.target.name
        const type = evento.target.type
        const value = evento.target.value

        
        //objeto[propiedad] -> Remplazamos la propiedad dentro del objeto.
        auxValores[name] = value;

        setValores(auxValores);

    }

    const onSubmit = async (evento) => {

        evento.preventDefault();

        limpiarError();
        setMensajeExito("");

        try {

            let imageUrl = "";

            if (imagen) {
                const resultadoImagen = await uploadImageApi(imagen);

                imageUrl = resultadoImagen.imageUrl;
            }

            // Crear Food
            const datosFood = {
                ...valores,
                image: imageUrl
            };

            await crearFoodApi(datosFood);
            
            setMensajeExito(
                "Comida creada correctamente"
            );

            try {

                const resultadoFoods = await getAllFoodApi({
                        page: 1,
                        limit: 3
                    });

                dispatch(cargarFoodSlice(resultadoFoods.foods));


                const resultadoOptions = await getAllFoodApi({
                        page: 1,
                        limit: 1000
                    });

                dispatch(cargarFoodOptionsSlice(resultadoOptions.foods));

            } catch (error) {
                console.log(error);

            }


            // Limpiar formulario
            setValores({
                name: "",
                calories: "",
                protein: "",
                carbs: "",
                fat: "",
                servingSize: "",
                category: ""
            });

            setImagen(null);


        } catch (error) {

            manejarError(
                error,
                "Error al crear la comida"
            );
        }
    };

    const listaCategorias = useSelector(state => state.categorySlice);

    return (
        <div>
            <h1>Crear Comidas</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={valores.name}
                        placeholder='Nombre de la comida'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Form.Label>Calorias</Form.Label>
                    <Form.Control
                        type="number"
                        name="calories"
                        value={valores.calories}
                        placeholder='Calorias'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Form.Label>Proteina</Form.Label>
                    <Form.Control
                        type="number"
                        name="protein"
                        value={valores.protein}
                        placeholder="Proteinas"
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <Form.Label>Carbohidratos</Form.Label>
                    <Form.Control
                        type="number"
                        name="carbs"
                        value={valores.carbs}
                        placeholder="Carbohidratos"
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <Form.Label>Grasas</Form.Label>
                    <Form.Control
                        type="number"
                        name="fat"
                        value={valores.fat}
                        placeholder="Grasas"
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <Form.Label>Porcion</Form.Label>
                    <Form.Control
                        type="number"
                        name="servingSize"
                        value={valores.servingSize}
                        placeholder="Porcion en gramos"
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <Form.Label>Categoria</Form.Label>
                   
                    <Form.Select name='category' value={valores.category} onChange={handleChange}>
                        <option value="">Seleccionar una Categoria</option>
                        {listaCategorias.map(categoria =>
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </option>
                        )}
                        </Form.Select>
                </div>

                <div>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImagen(e.target.files[0])
                        }
                    />
                </div>


                <Button className='btn-orange'
                    type='submit'
                    disabled={!formularioCompleto}
                >Crear</Button>
                
                {mensajeExito && (
                    <Alert variant="success">
                        {mensajeExito}
                    </Alert>
                )}    

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

            </form>
        </div>
    )
}

export default Food


