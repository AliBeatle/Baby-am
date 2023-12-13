import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Navbar from './NavBar';
import "../hojas.de-estilo/GenerateRecipes.css"
import Select from 'react-select';
import RecipeModal from "./RecipeModal";

const URI = 'http://localhost:8000/ingredientes';
const URI2 = 'http://localhost:8000/recipes-categories';
const URI3 = 'http://localhost:8000/recipes/generate';

const GenerateRecipe = () => {
    // Estados para el manejo de la generación de recetas
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipesCategoriesList, setRecipesCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [excludedIngredients, setExcludedIngredients] = useState([]);

    // Referencia para almacenar la receta generada
    const generatedRecipeRef = useRef(null);

    // Obtener la lista de ingredientes y categorías de recetas al montar el componente
    useEffect(() => {
        getIngredients();
        getRecipesCategories();
    }, []);

    // Función para obtener la lista de ingredientes
    const getIngredients = async () => {
        const res = await axios.get(URI);
        const ingredientesOrdenados = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setIngredientsList(ingredientesOrdenados);
    };

    // Función para obtener la lista de categorías de recetas
    const getRecipesCategories = async () => {
        const res = await axios.get(URI2);
        setRecipesCategoriesList(res.data);
    };

    // Función para manejar el cambio de categoría seleccionada
    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption); // Almacena la categoría seleccionada en el estado
    };

    // Función para manejar el cambio de ingredientes excluidos
    const handleIngredientsChange = (selectedOptions) => {
        const excludedIngredientsIds = selectedOptions.map((option) => option.value);
        setExcludedIngredients(excludedIngredientsIds); // Almacena los ingredientes excluidos en el estado
    };

    // Función para generar una receta aleatoria
    const handleGenerateRecipe = async () => {
        const response = await axios.post(URI3, {
            categoryId: selectedCategory ? selectedCategory.value : null,
            excludedIngredients,
        });

        const generatedRecipes = response.data;
        const numberRandom = Math.floor(Math.random() * generatedRecipes.result.length);
        const randomRecipe = generatedRecipes.result[numberRandom];

        // Almacena la receta generada en la referencia
        generatedRecipeRef.current = {
            name: randomRecipe.nombre,
            link: randomRecipe.link,
        };

        setIsModalOpen(true); // Abre el modal después de obtener la receta
    };

    return (
        <>
            <div className="recipes-container">
                <div className="overlay">
                    <Navbar />
                    <div className="recipe-card">
                        <h1 className="card-title">GENERAR RECETA</h1>
                        <p className="card-description">
                            Selecciona una categoría para tu receta y excluye algún ingrediente si es necesario.
                        </p>
                        <div className="select_button_container">
                            <Select
                                options={recipesCategoriesList.map(category => ({
                                    value: category.id,
                                    label: category.nombre,
                                }))}
                                placeholder="Selecciona una categoría"
                                className="select-category"
                                classNamePrefix="select-category"
                                onChange={handleCategoryChange} // Maneja el cambio de categoría

                            />
                            <Select
                                options={ingredientsList.map(ingrediente => ({
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
                        </div>
                        <button className="btn-generate-recipe"
                            onClick={handleGenerateRecipe}>Generar Receta</button>
                    </div>
                </div>
            </div>
            <RecipeModal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(false);
                    generatedRecipeRef.current = null; // Limpia los datos de la receta generada al cerrar el modal
                }}
                recipeName={generatedRecipeRef.current ? generatedRecipeRef.current.name : ""}
                recipeLink={generatedRecipeRef.current ? generatedRecipeRef.current.link : ""}
            />
        </>

    );
};

export default GenerateRecipe;