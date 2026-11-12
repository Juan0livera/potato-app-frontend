import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import useError from "../hooks/useError";

import { buscarRecetasApi } from "../services/RecetaServices"

const Recetas = () => {
    const [ingrediente, setIngredientes] = useState("");
    const [recetas, setRecetas] = useState([]);
    const [loading, setLoading] = useState(false);
    const { error, manejarError, limpiarError } = useError();

    const buscarRecetas = async () => {
        if(ingrediente.trim() === ""){
            return;
        }

        setLoading(true);
        limpiarError();
        setRecetas([]);

        try {
            const resultado = await buscarRecetasApi(ingrediente);

            setRecetas(resultado.recipes);
        } catch (error) {
            manejarError(error, "No se pudieron obtener recetas.");

        } finally {
            setLoading(false);
        }
    };



    return (
        <div>

            <h1>Buscar recetas</h1>

            <Form.Label>
                Ingrediente
            </Form.Label>

            <Form.Control
                type="text"
                value={ingrediente}
                placeholder="Ej: pollo"
                onChange={(e) =>
                    setIngredientes(e.target.value)
                }
            />

            <Button className="btn-orange"
                onClick={buscarRecetas}
                disabled={
                    ingrediente.trim() === "" ||
                    loading
                }
            >
                {loading
                    ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Buscando...</>
                    : "Buscar"
                }
            </Button>


            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}


            {!loading &&
                !error &&
                recetas.length === 0 &&
                ingrediente !== "" && (
                    <p>
                        No se encontraron recetas.
                    </p>
            )}


            {recetas.map(receta => (

                <div className="recipe-card" key={receta.id}>

                    <h3>
                        {receta.name}
                    </h3>

                    {receta.image && (
                        <img
                            src={receta.image}
                            alt={receta.name}
                            width="250"
                            className="recipe-image"
                        />
                    )}

                </div>

            ))}

        </div>
    );
};

export default Recetas
