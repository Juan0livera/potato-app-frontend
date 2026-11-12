import React from 'react'
import { Outlet, useNavigate} from 'react-router-dom'
import { useEffect, useState} from 'react'
import Contenido from './Contenido'


const Dashboard = () => {
  const navigate = useNavigate();
  const [estaLogueado, setLogeado] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const estaLogueado = token ? true : false;

    if(!estaLogueado){
      navigate("/login");
    }
    
  }, []);

  return (
    <>
      {!estaLogueado ? (
        <div> 
          <Contenido></Contenido>
        </div>
      )
      : 
      (<div className="loading-status justify-content-center p-5" role="status"><span className="spinner-border" aria-hidden="true" /> Cargando</div>)}

    
    </>
  )
}

export default Dashboard
