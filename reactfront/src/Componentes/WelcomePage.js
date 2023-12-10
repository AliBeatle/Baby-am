
import React, { useState } from "react";
import '../hojas.de-estilo/WelcomePage.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const URI = 'http://localhost:8000/usuario/register';
const URI1 = 'http://localhost:8000/usuario/login';

const WelcomePage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [passwordError, setPasswordError] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTabChange = () => {
        setIsLogin(!isLogin); // Cambia el estado de 'isLogin' al contrario del valor actual
    };
    
    // Función para validar la fortaleza de la contraseña
    const validatePassword = (password) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        return strongRegex.test(password); // Retorna true si la contraseña cumple con los requisitos, de lo contrario false
    };
    
    // Función para manejar el registro de un nuevo usuario
    const handleRegister = async (event) => {
        event.preventDefault();
    
        // Obtención de los datos del formulario de registro
        const nombre = event.target.nombre.value;
        const apellidos = event.target.apellidos.value;
        const email = event.target.email.value;
        const contraseña = event.target.password.value;
    
        // Validación de la contraseña ingresada
        const passwordIsValid = validatePassword(contraseña);
        if (!passwordIsValid) {
            setPasswordError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y ser de al menos 8 caracteres.'); // Establece un mensaje de error para la contraseña
            return;
        } 
    
        // Objeto con los datos del usuario para el registro
        const userData = {
            nombre,
            apellidos,
            email,
            contraseña,
        };
    
        try {
            // Petición para registrar un nuevo usuario
            const response = await axios.post(URI, userData);
    
            console.log('Usuario registrado:', response.data);
            setError(null); // Reinicia el error en caso de éxito
            setIsLogin(true); // Cambia al estado de inicio de sesión
    
        } catch (error) {
            console.error('Error:', error);
            console.log('Error response:', error.response);
            setError('Error al registrar usuario'); // Establece un mensaje de error en caso de fallo en el registro
        }
    };
    
    // Función para manejar el inicio de sesión
    const handleLogin = async (event) => {
        event.preventDefault();
    
        // Obtención del correo electrónico y la contraseña para el inicio de sesión
        const email = event.target['login-email'].value;
        const password = event.target['login-password'].value;
    
        // Objeto con los datos del usuario para el inicio de sesión
        const userData = {
            email,
            contraseña: password,
        };
    
        try {
            // Petición para iniciar sesión
            const response = await axios.post(URI1, userData);
    
            // Almacenamiento del token y el correo electrónico en el localStorage
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userEmail', email);
    
            console.log('Inicio de sesión exitoso:', response.data);
            setError(null); // Reinicia el error en caso de éxito
            navigate('/mainview'); // Redirección a la vista principal
    
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response.data);
            setError('Error al iniciar sesión'); // Establece un mensaje de error en caso de fallo en el inicio de sesión
        }
    };
    
    return (
        <>
            <div className="welcome-container">
                <h1 className="welcome-heading">Bienvenid@ a BabyÑam!</h1>
                <h3 className="welcome-text">Regístrate para poder acceder a la aplicación</h3>
                <div className="tabs-container">
                    <button className={`tab ${!isLogin ? 'active' : ''}`} onClick={handleTabChange}>Registro</button>
                    <button className={`tab ${isLogin ? 'active' : ''}`} onClick={handleTabChange}>Inicio de Sesión</button>
                </div>
                {isLogin ? (
                    <form onSubmit={handleLogin} className="form-container">
                        <label htmlFor="login-email">Correo Electrónico:</label>
                        <input type="email" id="login-email" name="login-email" required />

                        <label htmlFor="login-password">Contraseña:</label>
                        <input type="password" id="login-password" name="login-password" required />

                        <button type="submit" className="btn-login">Iniciar Sesión</button>
                        {error && <p>{error}</p>}
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required></input>

                        <label htmlFor="apellidos">Apellidos:</label>
                        <input type="text" id="apellidos" name="apellidos" required></input>

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required></input>

                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                        <button type="submit" className="btn-signup">Registrarse</button>
                    </form>
                )

                }
            </div>
        </>
    )
}

export default WelcomePage