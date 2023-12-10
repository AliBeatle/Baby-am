import React, { createContext, useContext, useState } from 'react';

// Crea un contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación para envolver la aplicación
export const AuthProvider = ({ children }) => {
  // Estado para verificar si el usuario está autenticado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para iniciar sesión
  const login = () => {
    // Lógica para iniciar sesión
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    // Lógica para cerrar sesión
    setIsLoggedIn(false);
  };

  return (
    // Proporciona el contexto de autenticación a los componentes hijos
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Si no se encuentra el contexto, muestra un error
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
