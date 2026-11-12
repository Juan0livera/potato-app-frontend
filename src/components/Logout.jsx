import React from 'react'
import { useNavigate } from 'react-router-dom';
import { limpiarUsuarioSlice } from '../redux/features/userSlice';
import {limpiarFoodLogSlice} from '../redux/features/foodLogSlice';
import {limpiarFoodSlice} from '../redux/features/foodSlice'
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const naviagte = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        dispatch(limpiarUsuarioSlice());
        dispatch(limpiarFoodSlice());
        dispatch(limpiarFoodLogSlice());


        naviagte("/login");
    }

    return (
        <div>
            <Button className='btn-orange' type='submit' onClick={handleLogout}>Logout</Button>
        </div>
    ) 
}

export default Logout
