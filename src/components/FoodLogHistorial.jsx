import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import useError from "../hooks/useError";
import Button from 'react-bootstrap/esm/Button';
import { abrirConfirmacion } from '../redux/features/confirmacionSlice';

import { getAllFoodLogsApi } from "../services/foodLogServices";

import { cargarFoodLogSlice } from "../redux/features/foodLogSlice";


const obtenerFechaHoy = () => {
    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
};


const FoodLogHistorial = () => {

    const dispatch = useDispatch();
    const { error, manejarError, limpiarError } = useError();

    const [fechaFiltro, setFechaFiltro] = useState(
        obtenerFechaHoy()
    );

    const [tipoComidaFiltro, setTipoComidaFiltro] =
        useState("");

    const foodLogs = useSelector(
        state => state.foodLogSlice
    );


    useEffect(() => {

        const cargarFoodLogs = async () => {
            limpiarError();
            try {

                const resultado =
                    await getAllFoodLogsApi();

                dispatch(
                    cargarFoodLogSlice(resultado)
                );

            } catch (error) {
                manejarError(error, "No se pudo cargar el historial de comidas.");
            }
        };

        cargarFoodLogs();

    }, [dispatch, limpiarError, manejarError]);




    // FILTRO - INICIO
    const foodLogsFiltrados = foodLogs.filter(foodLog => {

        const fecha = new Date(foodLog.consumedAt);

        const fechaFoodLog =
            `${fecha.getFullYear()}-` +
            `${String(fecha.getMonth() + 1).padStart(2, "0")}-` +
            `${String(fecha.getDate()).padStart(2, "0")}`;

        const coincideFecha =
            !fechaFiltro ||
            fechaFoodLog === fechaFiltro;

        const coincideTipo =
            !tipoComidaFiltro ||
            foodLog.meal === tipoComidaFiltro;

        return coincideFecha && coincideTipo;
    });


    const grupos = {
        breakfast: foodLogsFiltrados.filter(
            log => log.meal === "breakfast"
        ),

        lunch: foodLogsFiltrados.filter(
            log => log.meal === "lunch"
        ),

        snack: foodLogsFiltrados.filter(
            log => log.meal === "snack"
        ),

        dinner: foodLogsFiltrados.filter(
            log => log.meal === "dinner"
        ),

        other: foodLogsFiltrados.filter(
            log => log.meal === "other"
        )
    };


    const mostrarGrupo = (titulo, logs) => {

        if (logs.length === 0) {
            return null;
        }

        return(
        <div>
            <h2>{titulo}</h2>

            {logs.map(foodLog => {

                const food = foodLog.food;

                const factor =
                    foodLog.quantity / food.servingSize;

                const calorias =
                    food.calories * factor;

                const proteina =
                    food.protein * factor;

                const carbohidratos =
                    food.carbs * factor;

                const grasas =
                    food.fat * factor;


                return (
                    <div
                        className="food-item"
                        key={foodLog.id}
                    >

                        <h5>
                            {food.name}
                        </h5>

                        <p>
                            Cantidad: {foodLog.quantity} g -
                            {" "}
                            Calorías: {calorias.toFixed(0)} kcal -
                            {" "}
                            Proteína: {proteina.toFixed(1)} g -
                            {" "}
                            Carbohidratos: {carbohidratos.toFixed(1)} g -
                            {" "}
                            Grasas: {grasas.toFixed(1)} g
                        </p>

                        <Button className="btn-orange" type="button" aria-label="Eliminar"
                            onClick={() => dispatch(abrirConfirmacion({
                                tipo: 'registro', id: foodLog.id,
                                descripcion: `el registro de “${food.name}”`
                            }))}>X</Button>

                    </div>
                );
            })}
        </div>
        )
    };


    return (
        <div>

            <h1>Registro de comidas</h1>
            {error && <Alert variant="danger">{error}</Alert>}

            <div>
                <Form.Label>
                    Filtrar por fecha
                </Form.Label>

                <Form.Control
                    type="date"
                    value={fechaFiltro}
                    onChange={(e) =>
                        setFechaFiltro(e.target.value)
                    }
                />
            </div>


            <div>
                <Form.Label>
                    Filtrar por tipo de comida
                </Form.Label>

                <Form.Select 
                    value={tipoComidaFiltro}
                    onChange={(e) => setTipoComidaFiltro(e.target.value)}>

                    <option value="">Todas</option>

                    <option value="breakfast">Desayuno</option>

                    <option value="lunch">Almuerzo</option>

                    <option value="snack">Merienda</option>

                    <option value="dinner">Cena</option>

                    <option value="other">Otros</option>
                </Form.Select>
            </div>


            {foodLogsFiltrados.length === 0 ? (

                !error && <p>No hay registros para los filtros seleccionados.</p>

            ) : (
                <>
                    {mostrarGrupo("Desayuno", grupos.breakfast)}
                    {mostrarGrupo("Almuerzo", grupos.lunch)}
                    {mostrarGrupo("Merienda", grupos.snack)}
                    {mostrarGrupo("Cena",grupos.dinner)}
                    {mostrarGrupo("Otros",grupos.other)}
                </>
            )}

        </div>
    );
};


export default FoodLogHistorial;
