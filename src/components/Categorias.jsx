import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import { cargarCategorySlice, createCategorySlice, updateCategorySlice } from '../redux/features/categorySlice';
import { createCategoryApi, getAllCategoriesApi, patchCategoryApi } from '../services/categoryServices';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/esm/Button';
import { abrirConfirmacion } from '../redux/features/confirmacionSlice';
import useError from '../hooks/useError';

const Categorias = () => {
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userSlice);
  const esAdmin = usuario?.role === 'admin';
  const [editandoId, setEditandoId] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({ name: '', description: '' });
  const { error, manejarError, limpiarError } = useError();
 
  const {
    error: errorEdicion,
    manejarError: manejarErrorEdicion,
    limpiarError: limpiarErrorEdicion
  } = useError();

  const empezarEditar = (categoria) => {
    if (!esAdmin) return;
    setEditandoId(categoria.id);
    setValoresEditados({ name: categoria.name, description: categoria.description || '' });
    limpiarErrorEdicion();
  };

  const handleChangeEditar = (evento) => {
    const auxValores = { ...valoresEditados };
    const name = evento.target.name;
    const value = evento.target.value;
    auxValores[name] = value;
    setValoresEditados(auxValores);
  };

  const guardarEdicion = async (evento, id) => {
    evento.preventDefault();
    if (!esAdmin) return;
    limpiarErrorEdicion();
    try {
      const resultado = await patchCategoryApi(id, valoresEditados);
      dispatch(updateCategorySlice(resultado));
      setEditandoId(null);
    } catch (error) {
      manejarErrorEdicion(error, 'No se pudieron guardar los cambios.');
    }
  };

  const categorias = useSelector(
    state => state.categorySlice
  )




  const [valores, setValores] = useState({
    'name': "",
    'description': ""
  });






  // useEffect(() => {
  //     const cargarCategorias = async () => {
  //       try {
  //         const resultado = await getAllCategoriesApi();
  //         dispatch(cargarCategorySlice(resultado))
  //       }catch (error){
  //       }
  //     }

  //     cargarCategorias();
  //   },[dispatch] )




  const handleChange = (evento) => {
    const auxValores = { ...valores };

    const name = evento.target.name;
    const value = evento.target.value;
    const type = evento.target.type;


    auxValores[name] = value;
    setValores(auxValores);
  }

  const onSubmit = async (evento) => {
    evento.preventDefault();
    limpiarError();
    try {
      const resultado = await createCategoryApi(valores);
      dispatch(createCategorySlice(resultado));
    } catch (error) {
      manejarError(error, 'No se pudo crear la categoría.');
    }

  }


  if (!esAdmin) return null;

  return (
    <div className="row g-4 categories-layout">
      <form className="col-md-5 col-lg-4 category-form" onSubmit={onSubmit}>
        <h1>Crear Categoria</h1>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name='name' value={valores.name} placeholder='Nombre de la categoria' onChange={handleChange} />
        <Form.Label>Descripcion</Form.Label>
        <Form.Control type="text" name='description' value={valores.description} placeholder='Descripcion de la categoria' onChange={handleChange} />

        <Button className="btn-orange" type='submit'>Crear</Button>
        {error && <p className="alert alert-danger" role="alert">{error}</p>}
      </form>



      <div className="col-md-7 col-lg-8 category-list">
        <h1>Categorías</h1>
        {categorias.map(categoria => (
          <div className="food-item category-item" key={categoria.id}>
            {editandoId === categoria.id ? (
              <form className="category-edit" onSubmit={(evento) => guardarEdicion(evento, categoria.id)}>
                <Form.Label htmlFor={`categoria-nombre-${categoria.id}`}>Nombre</Form.Label>
                <Form.Control id={`categoria-nombre-${categoria.id}`} type="text" name="name"
                  value={valoresEditados.name} onChange={handleChangeEditar} required />
                <Form.Label htmlFor={`categoria-descripcion-${categoria.id}`}>Descripción</Form.Label>
                <Form.Control id={`categoria-descripcion-${categoria.id}`} type="text" name="description"
                  value={valoresEditados.description} onChange={handleChangeEditar} />
                {errorEdicion && <p className="alert alert-danger" role="alert">{errorEdicion}</p>}
                <div className="button-actions">
                  <Button className="btn-orange" type="submit">Guardar cambios</Button>
                  <Button variant="secondary" type="button" onClick={() => {
                    setEditandoId(null);
                    limpiarErrorEdicion();
                  }}>Cancelar</Button>
                </div>
              </form>
            ) : (
            <>
            <h3>{categoria.name}</h3>
            <p>{categoria.description}</p>

            <div className="button-actions category-actions">
            <Button className="btn-orange" type="button" onClick={() => empezarEditar(categoria)}>Editar</Button>
            <Button className="btn-orange" type="button" aria-label="Eliminar"
                            onClick={() => dispatch(abrirConfirmacion({
                                tipo: 'categoria', id: categoria.id,
                                descripcion: `la categoría “${categoria.name}”`
                            }))}>X</Button>
            </div>
            </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categorias
