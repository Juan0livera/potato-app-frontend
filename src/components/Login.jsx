import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { loginApi } from '../services/authServices';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";
import { cargarUsuariosSlice } from "../redux/features/userSlice";
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import useError from '../hooks/useError';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [valores, setValores] = useState({
      "identificador" : "", 
      "password" : ""
    });
    
    const { error, manejarError, limpiarError } = useError();

    const formularioCompleto = valores.identificador && valores.password

    const onSubmit = async (e) =>{
      e.preventDefault(); 
      limpiarError();
      try {
        const resultado = await loginApi(valores);
        
        const token = resultado.token;
        const user = resultado.user;
        
     
        
        window.localStorage.setItem("token", token);

        localStorage.setItem(
          "usuario",
          JSON.stringify(resultado.user)
        );
        
        dispatch(cargarUsuariosSlice(user));

        navigate("/dashboard")

    

      } catch (error) {
        manejarError(error, "Error al ingresar");
      }

    }

    const handleChange = (e) => {
      const auxValores = {...valores};
      const name = e.target.name;
      const type = e.target.type;
      const value = type == "checkbox" ? e.target.checked : e.target.value;

      auxValores[name] = value;

    
      setValores(auxValores);
    }
    
    return (
    <div className="auth-page">
        <a className="brand auth-brand" href="/login">
        
        <span className="brand-mark" aria-hidden="true">P</span> Potato<span className="brand-accent">App</span></a>
        
        <h1>Iniciar sesión</h1>

        <form className="auth-form">
          <div>
            <Form.Label>Usuario o email</Form.Label>
            <Form.Control
              type="text"
              name="identificador"
              value={valores.identificador}
              placeholder="Ingrese su usuario/email"
              onChange={handleChange}
            />
          </div>

          <div>
            <Form.Label>Contraseña</Form.Label>

            <Form.Control
              type="password"
              name='password'
              value={valores.password}
              placeholder='Ingrese su contraseña'
              onChange={handleChange}
            />
          </div>



          <Button  className="btn-orange" type="submit" onClick={onSubmit} disabled={!formularioCompleto}>
            Ingresar
          </Button>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}


          <p>No tienes cuenta?
            <Link to="/registro">Registrarse</Link>
          </p>
      </form>
    </div>
  );
};

export default Login
