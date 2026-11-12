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


const GraficoSemana = () => {

    const foodLogs = useSelector(
        state => state.foodLogSlice
    );


    const obtenerFechaLocal = (fecha) => {

        const year = fecha.getFullYear();

        const month = String(
            fecha.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            fecha.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    const dias = [];

    for (let i = 6; i >= 0; i--) {

        const fecha = new Date();

        fecha.setDate(
            fecha.getDate() - i
        );

        dias.push(fecha);
    }


    const caloriasPorDia = dias.map(dia => {

        const fechaDia =
            obtenerFechaLocal(dia);

        const logsDelDia = foodLogs.filter(log => {

            const fechaLog =
                obtenerFechaLocal(
                    new Date(log.consumedAt)
                );

            return fechaLog === fechaDia;
        });


        const totalCalorias = logsDelDia.reduce(
            (total, log) => {

                const calorias =
                    log.food?.calories || 0;

                const servingSize =
                    log.food?.servingSize || 1;

                const quantity =
                    log.quantity || 0;

                const caloriasConsumidas =
                    calorias *
                    (quantity / servingSize);

                return (
                    total +
                    caloriasConsumidas
                );

            },
            0
        );


        return totalCalorias;
    });

    const totalCaloriasSemana = caloriasPorDia.reduce(
        (total, calorias) => total + calorias,
        0
    );

    const labels = dias.map(dia =>
        dia.toLocaleDateString(
            "es-UY",
            {
                weekday: "short",
                day: "2-digit"
            }
        )
    );


    const data = {

        labels: labels,

        datasets: [
            {
                label: "Calorías consumidas",

                data: caloriasPorDia.map(calorias => Math.round(calorias)),

                backgroundColor: "#f97316",
                borderColor: "#c2410c",
                borderWidth: 1
            }
        ]
    };


    return (
        <div>

            <h2>
                Calorías de los últimos 7 días
            </h2>

            <p className="fs-4 fw-bold">
                Total de los últimos 7 días: {totalCaloriasSemana.toFixed(0)} kcal
            </p>

            <Bar data={data} />

        </div>
    );
};


export default GraficoSemana;
