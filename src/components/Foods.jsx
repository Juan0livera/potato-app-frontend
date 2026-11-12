import React, { useEffect, useState } from 'react'
import Food from "./Food"
import { useDispatch, useSelector } from 'react-redux'
import { getAllFoodApi, patchFoodApi } from '../services/foodServices'
import { cargarFoodSlice, updateFoodSlice } from '../redux/features/foodSlice'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import useError from '../hooks/useError';
import AnalisisIA from "./AnalisisIA";
import { abrirConfirmacion } from '../redux/features/confirmacionSlice';



const Foods = () => {
    const dispatch = useDispatch();
    const { error, manejarError, limpiarError } = useError();
    const {
        error: errorEdicion,
        manejarError: manejarErrorEdicion,
        limpiarError: limpiarErrorEdicion
    } = useError();
    const [editandoId, setEditandoId] = useState(null);
    const [categoriaFiltro, setCategoriaFiltro] = useState("");
    const [caloriasMin, setCaloriasMin] = useState("");
    const [caloriasMax, setCaloriasMax] = useState("");
    const [nombreFiltro, setNombreFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const limitePaginas = 3;

    const [valoresEditados, setValoresEditados] = useState({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        servingSize: "",
        category: ""
    });

  

    const listaFoods = useSelector(
        (state) => state.foodSlice
    )

    const listaCategorias = useSelector(
        state => state.categorySlice
    );
    
    const handleChangeEditar = (evento) => {
        const { name, value } = evento.target;

        setValoresEditados({
            ...valoresEditados,
            [name]: value
        });
    };

    // editar inicio
    const empezarEditar = (food) => {
        limpiarErrorEdicion();

        setEditandoId(food.id);

        setValoresEditados({
            name: food.name,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            servingSize: food.servingSize,
            category: food.category?.id
        });
    };



    const guardarEdicion = async (id) => {
        limpiarErrorEdicion();

        try {

            const resultado = await patchFoodApi(
                id,
                valoresEditados
            );

            dispatch(
                updateFoodSlice(resultado)
            );

            setEditandoId(null);

        } catch (error) {
            manejarErrorEdicion(error, 'No se pudieron guardar los cambios de la comida.');
        }
    };
  

    // Este useEffect pasa a estar en contenido para que todos los componentes tengan cargados la lista de comidas.
    // useEffect(() => {
    //     const cargarDatos = async () => {
    //         try {
    //             const resultado = await getAllFoodApi();
    //             dispatch(cargarFoodSlice(resultado.foods));
    //         } catch (error) {
    //         }
    //     };
    //     cargarDatos();
    // }, [dispatch])


    // const foodFiltrado = listaFoods.filter(food => {
        
    //     const coincideNombre =
    //         nombreFiltro === "" ||
    //         food.name
    //             .toLowerCase()
    //             .includes(nombreFiltro.toLowerCase());

    //     const idCategoriaFood =
    //         food.category?.id || food.category;

    //     const coincideCategoria =
    //         categoriaFiltro === "" ||
    //         idCategoriaFood === categoriaFiltro;

    //     const coincideCaloriasMin =
    //         caloriasMin === "" ||
    //         food.calories >= Number(caloriasMin);

    //     const coincideCaloriasMax =
    //         caloriasMax === "" ||
    //         food.calories <= Number(caloriasMax);

    //     return (
    //         coincideNombre &&
    //         coincideCategoria &&
    //         coincideCaloriasMin &&
    //         coincideCaloriasMax
    //     );
    // });


    const limpiarFiltros = async () => {
        limpiarError();

        setNombreFiltro("");
        setCategoriaFiltro("");
        setCaloriasMin("");
        setCaloriasMax("");

        try {

            const resultado = await getAllFoodApi({
                page: 1,
                limit: limitePaginas
            });

            dispatch(
                cargarFoodSlice(resultado.foods)
            );

            setPaginaActual(
                resultado.pagination.page
            );

            setTotalPaginas(
                resultado.pagination.totalPages
            );

        } catch (error) {
            manejarError(error, 'No se pudieron cargar las comidas al limpiar los filtros.');
        }
    };


    //Filtro Query
    const buscarFoods = async (pagina = 1) => {
        limpiarError();
        try {
            
            

            const filtros = {
                page: pagina,
                limit : limitePaginas
            };

            if(nombreFiltro !== ""){
                filtros.name =nombreFiltro;
            }

            if(categoriaFiltro !== ""){
                filtros.category = categoriaFiltro;
            }

            if(caloriasMin !== ""){
                filtros.minCalories = caloriasMin;
            }

            if(caloriasMax !== "") {
                filtros.maxCalories = caloriasMax;
            }

            //Codigo borrado. No funcionaba correctamente cuando se mandaban parametros 
            //vacios  en especifico los de caloriasMin y caloriasMax. Por lo tanto
            //hice otro codigo con validaciones para no mandar campos vacios. Probablemente
            // tambien se podria haber solucionado desde el backend.
            // const resultado = await getAllFoodApi({
            //     name: nombreFiltro,
            //     category: categoriaFiltro,
            //     minCalories: caloriasMin,
            //     maxCalories: caloriasMax
            // });
            const resultado = await getAllFoodApi(filtros);


            dispatch(cargarFoodSlice(resultado.foods))

            setPaginaActual(resultado.pagination.page);
            setTotalPaginas(resultado.pagination.totalPages);

        } catch (error) {
            manejarError(error, 'No se pudieron cargar las comidas.');
        }
    }

    useEffect(() => {
        buscarFoods(1);
    }, []);


    return (
            <div>
                <h1>Lista de Comidas</h1>

                <Form.Label>Buscar por nombre</Form.Label>

                <Form.Control
                    type="text"
                    value={nombreFiltro}
                    onChange={(e) =>
                        setNombreFiltro(e.target.value)
                    }
                />


                <Form.Label>Categoría</Form.Label>

                <Form.Select
                    value={categoriaFiltro}
                    onChange={(e) =>
                        setCategoriaFiltro(e.target.value)
                    }
                >
                    <option value="">
                        Todas las categorías
                    </option>

                    {listaCategorias.map(categoria => (
                        <option
                            key={categoria.id}
                            value={categoria.id}
                        >
                            {categoria.name}
                        </option>
                    ))}
                </Form.Select>


                <Form.Label>Calorías mínimas</Form.Label>

                <Form.Control
                    type="number"
                    value={caloriasMin}
                    onChange={(e) =>
                        setCaloriasMin(e.target.value)
                    }
                />


                <Form.Label>Calorías máximas</Form.Label>

                <Form.Control
                    type="number"
                    value={caloriasMax}
                    onChange={(e) =>
                        setCaloriasMax(e.target.value)
                    }
                />


                <div className="button-actions">
                <Button className='btn-orange'
                    onClick={() => buscarFoods(1)}>
                    Buscar
                </Button>

                <Button  className='btn-orange'
                    onClick={limpiarFiltros}>
                    Limpiar filtros
                </Button>

                </div>

                <div className="button-actions pagination-actions">
                    <Button className='btn-orange'
                        disabled={paginaActual <= 1}
                        onClick={() =>
                            buscarFoods(paginaActual - 1)
                        }
                    >
                        Anterior
                    </Button>

                    <span className="pagination-label">
                        Página {paginaActual} de {totalPaginas}
                    </span>

                    <Button className='btn-orange'
                        disabled={paginaActual >= totalPaginas}
                        onClick={() =>
                            buscarFoods(paginaActual + 1)
                        }
                    >
                        Siguiente
                    </Button>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {listaFoods.length === 0 ? (
                    !error && <p>No se encontraron comidas</p>
                ) : (
                    listaFoods.map(food => (
                        <div className="food-item" key={food.id}>
                        {editandoId === food.id ? (
                            <>
                            <Form.Label htmlFor={`editar-name-${food.id}`}> Nombre</Form.Label>
                                <input className="form-control"
                                    id={`editar-name-${food.id}`}
                                    name="name"
                                    value={valoresEditados.name}
                                    onChange={handleChangeEditar}
                                />

                                <Form.Label htmlFor={`editar-calories-${food.id}`}> Calorías (kcal)</Form.Label>
                                <input className="form-control"
                                    id={`editar-calories-${food.id}`}
                                    type="number"
                                    name="calories"
                                    value={valoresEditados.calories}
                                    onChange={handleChangeEditar}
                                />

                                <Form.Label htmlFor={`editar-protein-${food.id}`}> Proteínas (g)</Form.Label>
                                <input className="form-control"
                                    id={`editar-protein-${food.id}`}
                                    type="number"
                                    name="protein"
                                    value={valoresEditados.protein}
                                    onChange={handleChangeEditar}
                                />

                                <Form.Label htmlFor={`editar-carbs-${food.id}`}> Carbohidratos (g)</Form.Label>
                                <input className="form-control"
                                    id={`editar-carbs-${food.id}`}
                                    type="number"
                                    name="carbs"
                                    value={valoresEditados.carbs}
                                    onChange={handleChangeEditar}
                                />

                                <Form.Label htmlFor={`editar-fat-${food.id}`}> Grasas (g)</Form.Label>
                                <input className="form-control"
                                    id={`editar-fat-${food.id}`}
                                    type="number"
                                    name="fat"
                                    value={valoresEditados.fat}
                                    onChange={handleChangeEditar}
                                />

                                <Form.Label htmlFor={`editar-servingSize-${food.id}`}> Tamaño de la porción (g)</Form.Label>
                                <input className="form-control"
                                    id={`editar-servingSize-${food.id}`}
                                    type="number"
                                    name="servingSize"
                                    value={valoresEditados.servingSize}
                                    onChange={handleChangeEditar}
                                />


                                {errorEdicion && <Alert variant="danger">{errorEdicion}</Alert>}
                                  <div className="food-actions mt-3">

                                <Button
                                    className="btn-orange"
                                    onClick={() => guardarEdicion(food.id)}
                                >
                                    Guardar cambios
                                </Button>

                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setEditandoId(null);
                                        limpiarErrorEdicion();
                                    }}
                                >
                                    Cancelar
                                </Button>

                            </div>

                                
                            </> 
                        ) : (
                            <>
                                <h3>{food.name}</h3>

                                <p>
                                    Calorias : {food.calories} |
                                    Proteina : {food.protein} |
                                    Carbohidratos : {food.carbs} |
                                    Grasas : {food.fat} |
                                    Categoria : {food.category?.name}
                                </p>
                                
                                <div>
                                    {food.image && (
                                        <img
                                            src={food.image}
                                            alt={food.name}
                                            className="food-image"
                                        />
                                    )}
                                </div>

                                <div className="button-actions food-actions">
                                <Button className='btn-orange'
                                    onClick={() => empezarEditar(food)}>Editar</Button>
                                <Button className="btn-orange" type="button" aria-label="Eliminar"
                            onClick={() => dispatch(abrirConfirmacion({
                                tipo: 'alimento', id: food.id,
                                descripcion: `el alimento “${food.name}”`
                            }))}>X</Button>
                                <AnalisisIA food={food} />
                                </div>
                            </>
                        )
                    }</div>
                ))
            )}
        </div>
    )
};


export default Foods
