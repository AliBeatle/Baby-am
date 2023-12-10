import React from "react";
import Modal from "react-modal";
import "../hojas.de-estilo/RecipeModal.css"

const RecipeModal = ({ isOpen, onRequestClose, recipeName, recipeLink }) => {

    return (
        <div id="customModalContainer">
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Recipe Modal"
                id="customModal"
                center
            >
                <h2>¡Aquí tienes tu receta!</h2>
                <p>{recipeName}</p>
                <a href={recipeLink} target="_blank" rel="noopener noreferrer">
                    Enlace
                </a>
                <button onClick={onRequestClose}>Cerrar</button>
            </Modal>
        </div>
    );
};

export default RecipeModal;