import React from "react";
import { useSelector } from "react-redux";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const GraficoCalorias = () => {

    const foodLogs = useSelector(
        state => state.foodLogSlice
    );


    const hoy = new Date();

    const foodLogsHoy = foodLogs.filter(foodLog => {

        const fecha = new Date(foodLog.consumedAt);

        return (
            fecha.getDate() === hoy.getDate() &&
            fecha.getMonth() === hoy.getMonth() &&
            fecha.getFullYear() === hoy.getFullYear()
        );
    });


    const calcularCalorias = (tipoComida) => {

        const logsTipo = foodLogsHoy.filter(
            log => tipoComida === undefined || log.meal === tipoComida
        );

        return logsTipo.reduce((total, log) => {

            const caloriasBase =
                log.food?.calories || 0;

            const porcionBase =
                log.food?.servingSize || 1;

            const cantidadConsumida =
                log.quantity || 0;

            const caloriasConsumidas =
                caloriasBase *
                (cantidadConsumida / porcionBase);

            return total + caloriasConsumidas;

        }, 0);
    };


    const data = {

        labels: [
            "Desayuno",
            "Almuerzo",
            "Merienda",
            "Cena",
            "Otros"
        ],

        datasets: [
            {
                label: "Calorías consumidas",

                data: [
                    calcularCalorias("breakfast"),
                    calcularCalorias("lunch"),
                    calcularCalorias("snack"),
                    calcularCalorias("dinner"),
                    calcularCalorias("other")
                ],

                backgroundColor: "#f97316",
                borderColor: "#c2410c",
                borderWidth: 1
            }
        ]
    };


    return (
        <div>

            <h2>Calorías consumidas hoy</h2>

            <p className="fs-4 fw-bold">
                Total del día: {calcularCalorias().toFixed(0)} kcal
            </p>

            <Bar data={data} />

        </div>
    );
};

export default GraficoCalorias;
