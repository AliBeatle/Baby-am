import React, { useState, useEffect } from 'react';
import '../hojas.de-estilo/MainView.css';
import Select from 'react-select';
import Navbar from './NavBar';
import axios from 'axios';
import { MenuSemanal } from './MenuSemanal';
import { Navigate } from 'react-router-dom';

const URI = 'http://localhost:8000/ingredientes';
const URI2 = 'http://localhost:8000/recipes/generateMenu';

const MainView = () => {

  const token = localStorage.getItem('token');
  const [showTable, setShowTable] = useState(false);
  const [ingredientsListMainView, setIngredientsListMainView] = useState([]);
  const [excludedIngredientsMainView, setExcludedIngredientsMainView] = useState([]);
  const [menu, setMenu] = useState([]);
  const [showHideButton, setShowHideButton] = useState(false);

  useEffect(() => {
    getIngredientes();
  }, []);

  useEffect(() => {
    // Obtiene el correo del usuario del almacenamiento local
    const emailUsuario = obtenerCorreoUsuario();

    // Obtiene las recetas guardadas en el almacenamiento local para mostrarlas en la tabla si existen
    let recetasMenu = JSON.parse(localStorage.getItem(`menu-${emailUsuario}`));
    if (recetasMenu) {
      // Establece las recetas del menú en el estado y muestra la tabla
      setMenu(recetasMenu);
    }
  }, []);

  // Obtiene la lista de ingredientes desde la API y ordena los ingredientes
  const getIngredientes = async () => {
    const res = await axios.get(URI);
    const ingredientesOrdenados = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setIngredientsListMainView(ingredientesOrdenados);
  };

  // Maneja el cambio de los ingredientes seleccionados
  const handleIngredientsChange = (selectedOptions) => {
    const excludedIngredientsIds = selectedOptions.map(option => option.value);
    setExcludedIngredientsMainView(excludedIngredientsIds);
  };
  

  // Obtiene recetas aleatorias de una lista dada
  const getRandomRecipes = (recipes, count) => {
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Organiza las recetas seleccionadas en un menú para cada día de la semana
  const organizarRecetas = (menu) => {
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const categorias = [1, 2, 3, 4]
    const recetasSelecionadas = {}

    categorias.forEach(categoria => {
      recetasSelecionadas[categoria] = []
    })

    const recetasPorDia = diasSemana.map((dia) => {
      const recetasDia = {};

      categorias.forEach(categoria => {
        const recetasDisponibles = menu.filter(receta => receta.category_id === categoria && !recetasSelecionadas[categoria]?.includes(receta.id_Receta))

        if (recetasDisponibles.length > 0) {
          const recetaAleatoria = recetasDisponibles[Math.floor(Math.random() * recetasDisponibles.length)]
          recetasDia[categoria] = recetaAleatoria
          recetasSelecionadas[categoria].push(recetaAleatoria.id_Receta)
        }
      })

      return { dia, recetas: recetasDia };
    });

    return recetasPorDia;
  };

  // Obtiene el correo electrónico del usuario del almacenamiento local
  const obtenerCorreoUsuario = () => {
    return localStorage.getItem('userEmail');
  };

  // Genera el menú basado en ingredientes excluidos y lo almacena en el almacenamiento local
  const handleGenerateMenu = async () => {
    try {
      localStorage.removeItem('receta');

      // Llamada a una API para obtener recetas según los ingredientes excluidos
      const response = await axios.post(URI2, {
        excludedIngredients: excludedIngredientsMainView
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      // Filtrar las recetas por su category_id
      const recipes = response.data.result;

      const filteredRecipesByCategory = recipes.reduce((acc, recipe) => {
        const { category_id } = recipe;

        if (!acc[category_id]) {
          acc[category_id] = [];
        }

        acc[category_id].push(recipe);
        return acc;
      }, {});

      const selectedRecipes = [];

      // Seleccionar aleatoriamente 7 recetas de cada category_id
      for (let category = 1; category <= 4; category++) {
        const recipesForCategory = filteredRecipesByCategory[category];
        if (recipesForCategory) {
          const randomRecipes = getRandomRecipes(recipesForCategory, 7);
          selectedRecipes.push(...randomRecipes);
        }
      }

      console.log('Recetas seleccionadas:', selectedRecipes);

      const orderedMenu = organizarRecetas(selectedRecipes);

      const emailUsuario = obtenerCorreoUsuario();
      localStorage.setItem(`menu-${emailUsuario}`, JSON.stringify(orderedMenu));

      // Actualizar el estado para mostrar la tabla del menú
      setMenu(orderedMenu);
      setShowTable(true);
      setShowHideButton(true);
    } catch (error) {
      console.error('Error al generar el menú:', error);
      // Manejar errores, mostrar mensajes al usuario, etc.
    }
  };

  // Si no hay token, redirige al usuario a la página de inicio
  if (!token) {
    return <Navigate to="/" />
  }

  return (
    <div className="main-container">
      <div className="overlay">
        <header className="menu-bar">
          <Navbar />
        </header>
        <div className="content">
          <h1>¡Bienvenido a BabyÑAM!</h1>
          <h3>¿Preparado para generar un MENÚ SEMAMAL para tu bebé? ¡VAMOS A ELLO!</h3>
          <p>Selecciona a continuación aquellos alimentos que NO quieres que se incluyan en el menú:</p>
          <div className='select_button_container'>
            <Select
              options={ingredientsListMainView.map(ingrediente => ({
                value: ingrediente.id_ingrediente,
                label: ingrediente.nombre
              }))}
              isMulti
              closeMenuOnSelect={false}
              placeholder="Selecciona ingredientes a excluir"
              className="select-ingredients"
              classNamePrefix="select-ingredients"
              onChange={handleIngredientsChange} // Maneja el cambio de ingredientes
            />
            <button className="button-generar-menu" onClick={handleGenerateMenu}>
              Generar Menú
            </button>
            {menu.length > 0 && (
              <button
                className={`toggle-menu-button`}
                onClick={() => {
                  setShowTable(!showTable);
                }}
              >
                {showTable ? 'Ocultar Menú' : 'Visualizar Menú'}
              </button>
            )}

            {(showTable || menu.length > 0) && <MenuSemanal menu={menu} showTable={showTable} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainView;
