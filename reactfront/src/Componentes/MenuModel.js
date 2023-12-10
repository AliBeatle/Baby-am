// Modelo para cada comida
export const Meal = {
    name: '',
    link: '',
  };
  
  // Estado inicial del menú por día
  export const initialMenu = {
    desayuno: { ...Meal },
    almuerzo: { ...Meal },
    merienda: { ...Meal },
    cena: { ...Meal },
  };