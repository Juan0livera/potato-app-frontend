import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from "react-bootstrap/Spinner";
import useLoading from "../hooks/useLoading";


import Food from './Food';
import Foods from './Foods';
import Categorias from './Categorias';
import FoodLog from './FoodLog';
import FoodLogHistorial from './FoodLogHistorial';
import PlanInfo from './planInfo';
import UpgradePlan from './UpgradePlan';
import GraficoCalorias from './GraficoCalorias';
import GraficoSemana from './GraficoSemana';
import Recetas from './Recetas';
import Logout from './Logout';

import { getAllFoodApi } from '../services/foodServices';
import { getAllCategoriesApi } from '../services/categoryServices';
import { getAllFoodLogsApi } from '../services/foodLogServices';

import { cargarFoodSlice } from '../redux/features/foodSlice';
import { cargarCategorySlice } from '../redux/features/categorySlice';
import { cargarFoodLogSlice } from '../redux/features/foodLogSlice';
import { cargarUsuariosSlice } from '../redux/features/userSlice';
import { cargarFoodOptionsSlice } from '../redux/features/foodOptionSlice'

import { useSelector } from 'react-redux';

import "../styles/dashboard.css";

const Contenido = () => {
    const dispatch = useDispatch();
    const { loading, ejecutarConLoading } = useLoading(true);

    const usuario = useSelector(
        state => state.userSlice
    );

    const esAdmin = usuario?.role === 'admin';

    useEffect(() => {

        const controller = new AbortController();

        const cargarDatosIniciales = async () => {

            await ejecutarConLoading(async () => {

                try {

                    const usuarioGuardado = localStorage.getItem("usuario");

                    if (usuarioGuardado) {
                        dispatch(cargarUsuariosSlice(JSON.parse(usuarioGuardado))
                        );
                    }

                    const resultadoFoods = 
                            await getAllFoodApi({
                                page: 1,
                                limit: 3
                            },
                            controller.signal
                        );

                    dispatch(cargarFoodSlice(resultadoFoods.foods));

                    const resultadoFoodOptions =
                        await getAllFoodApi(
                            {
                                page: 1,
                                limit: 1000
                            },
                            controller.signal
                        );

                    dispatch(cargarFoodOptionsSlice(resultadoFoodOptions.foods));

                    const resultadoCategorias = await getAllCategoriesApi(controller.signal);

                    dispatch(cargarCategorySlice(resultadoCategorias));

                    const resultadoFoodLogs = await getAllFoodLogsApi(controller.signal);

                    dispatch(cargarFoodLogSlice(resultadoFoodLogs));

                } catch (error) {

                    if (
                        error.name === "CanceledError"
                    ) {
                        return;
                    }

                }

            });
        };

        cargarDatosIniciales();

        return () => {
            controller.abort();
        };

    }, [dispatch]);



    if (loading) {
        return (
            <div className="loading-page">

                <Spinner
                    animation="border"
                    className="spinner-orange"
                />

                <p>Cargando información...</p>

            </div>
        );
    }


    return (

        <div className="dashboard-page" id="inicio">
            <nav className="navbar app-navbar" aria-label="Navegación principal">
                <div className="container app-nav-inner">
                    <a className="navbar-brand brand" href="#inicio"><span className="brand-mark" aria-hidden="true">P</span> Potato<span className="brand-accent">App</span></a>
                    <div className="nav app-nav-links">
                        <a className="nav-link" href="#plan">Mi plan</a>
                        <a className="nav-link" href="#alimentos">Alimentos</a>
                        <a className="nav-link" href="#registro-diario">Registro diario</a>
                        <a className="nav-link" href="#estadisticas">Estadísticas</a>
                        <a className="nav-link" href="#recetas">Recetas</a>
                        {esAdmin && (
                            <a className="nav-link" href="#categorias">Categorías</a>
                        )}
                    </div>
                </div>
            </nav>

            <Container className="py-4">

                {/* HEADER */}

                <div className="dashboard-header mb-4">

                    <div>
                        <h1>Gestión nutricional y seguimiento diario</h1>
                    </div>

                    <p className="mb-0 text-muted">
                        Bienvenido, <strong>{usuario.username}</strong>
                    </p>

                    <Logout />

                </div>


                {/* PLAN */}
                <section className="dashboard-section" id="plan">
                    <div className="section-heading">
                        <div>
                            <h2>Mi plan</h2>
                            <p>Consultá tu plan actual y el uso de tu cuenta.</p>
                        </div>
                    </div>

                    <Row className="g-4">

                        <Col lg={6}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <PlanInfo />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <UpgradePlan />
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </section>


                {/* ALIMENTOS */}
                <section className="dashboard-section" id="alimentos">

                    <div className="section-heading">
                        <div>
                            <h2>Alimentos</h2>
                            <p>
                                Creá alimentos y consultá los disponibles.
                            </p>
                        </div>
                    </div>

                    <Row className="g-4">

                        <Col lg={4}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <Food />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={8}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <Foods />
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                </section>


                {/* REGISTRO DIARIO */}

                <section className="dashboard-section" id="registro-diario">

                    <h2 className="section-title">
                        Registro diario
                    </h2>

                    <Row className="g-4">

                        <Col lg={4}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <FoodLog />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={8}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <FoodLogHistorial />
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                </section>


                {/* ESTADÍSTICAS */}

                <section className="dashboard-section" id="estadisticas">

                    <h2 className="section-title">
                        Estadísticas
                    </h2>

                    <Row className="g-4">

                        <Col lg={6}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <GraficoCalorias />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card className="dashboard-card h-100">
                                <Card.Body>
                                    <GraficoSemana />
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                </section>


                {/* RECETAS */}

                <section className="dashboard-section" id="recetas">

                    <h2 className="section-title">
                        Descubrir recetas
                    </h2>

                    <Card className="dashboard-card">
                        <Card.Body>
                            <Recetas />
                        </Card.Body>
                    </Card>

                </section>


                {/* CATEGORÍAS */}

                {esAdmin && (
                <section className="dashboard-section" id="categorias">

                    <h2 className="section-title">
                        Categorías
                    </h2>

                    <Card className="dashboard-card">
                        <Card.Body>
                            <Categorias />
                        </Card.Body>
                    </Card>

                </section>
                )}


            </Container>

        </div>
    );
};

export default Contenido
