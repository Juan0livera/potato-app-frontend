import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
import Registro from './Registro';

/*En el caso de las rutas no importa el orden ya que se toman como hermanas */

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/dashboard" element={<Dashboard />}>
                </Route>
                <Route path="*" element={<Navigate to="/login"></Navigate>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Rutas