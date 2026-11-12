import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { registroApi } from '../services/authServices';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { cargarUsuariosSlice } from '../redux/features/userSlice';
import useError from '../hooks/useError';


const Registro = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error,manejarError,limpiarError} = useError();

  const [valores, setValores] = useState({
    "username" : "",
    "email" : "",
    "age" : "",
    "password" : "",
    "confirmPassword" : ""
  })
  

  const formularioCompleto =
    valores.username &&
    valores.email &&
    valores.age &&
    valores.password &&
    valores.confirmPassword;

  const onSubmit = async (evento) => {
    evento.preventDefault();
    
    try{
      const resultado = await registroApi(valores);
      const token = resultado.token
      window.localStorage.setItem("token", token);
      // Guardar usuario
      localStorage.setItem("usuario", JSON.stringify(resultado.user));
      dispatch(cargarUsuariosSlice(resultado.user));
      navigate("/dashboard")
    } catch (error) {
      
      manejarError(
        error,
        "Error al registrarse"
      );  
      
    }   
  }

  const handleChange = async (evento) => {
    const auxValores = {...valores};
    const name = evento.target.name; // obtenemos username
    const type = evento.target.type; // obtenemos type=text
    const value = evento.target.value; // obtenemos el valor ej. "pedro22"

    auxValores[name] = value;


    setValores(auxValores);
  }

  return (
    <div className="auth-page">
      <a className="brand auth-brand" href="/login"><span className="brand-mark" aria-hidden="true">P</span> Potato<span className="brand-accent">App</span></a><p className="eyebrow">TU BIENESTAR EMPIEZA ACÁ</p><h1>Registro</h1><p className="auth-description">Empezá a construir hábitos que te hagan bien.</p>

      <form className="auth-form">
        <div>
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={valores.username}
            placeholder="Ingrese su usuario"
            onChange={handleChange}
          ></Form.Control>
        </div>

        <div>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={valores.email}
            placeholder="ingrese su email"
            onChange={handleChange}
          ></Form.Control>
        </div>

        <div>
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={valores.age}
            placeholder="Ingrese su edad"
            onChange={handleChange}
          ></Form.Control>
        </div>

        <div>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={valores.password}
            placeholder="Contraseña"
            onChange={handleChange}
          ></Form.Control>
        </div>

        <div>
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={valores.confirmPassword}
            placeholder="Contraseña"
            onChange={handleChange}
          ></Form.Control>
        </div>

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        <Button className='btn-orange' type='submit' onClick={onSubmit} disabled={!formularioCompleto}>Registrase</Button>

        


      </form>
    </div>
  )
}

export default Registro
