import React from 'react';
import '../hojas.de-estilo/AboutPage.css';
import Navbar from './NavBar';

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="overlay" id='about_view_id'>
                <header className="menu-bar">
                    <Navbar />
                </header>
                <div className="about-content">
                    <h1>¿ Qué es BabyÑam</h1>
                    <h3>Información sobre la aplicación</h3>
                    <p><strong>BabyÑam</strong> es una aplicación pensada para ayudar a padres y madres a simplificar la compleja tarea de planificar las comidas de los bebés a partir de la introducción de la alimentación complementaria.<br />
                        Como has podido comprobar, se trata de una aplicación web de uso intuitivo y eficaz que genera menús semanales equilibrados y saludables y que se adaptan a las necesidades nutricionales de los bebés.
                        Podrás personalizar los menús según las preferencias alimenticias de tus hijos o las restricciones dietéticas que puedan tener eliminando aquellos ingredientes que no quieres que incluyan las recetas que te sugerimos.<br />
                        Es un proyecto pensado para facilitarte la organización diaria, con el objetivo de que consigas algo muy preciado: TIEMPO.
                        Además de los menús, la aplicación te ofrecerá enlaces directos a las recetas para preparar las elaboraciones.<br />
                        Por sus características, BabyÑam no solo beneficia a padres y madres, sino que también puede ser útil en otros ámbitos, como escuelas infantiles o para profesionales en el ámbito de la salud relacionados con bebés.
                        <h3>Breve manual de usuario</h3>
                        <p>
                        BabyÑam cuenta con una interfaz de inicio de sesión que muestra dos pestañas distintas: una para el registro de nuevos usuarios y otra para iniciar sesión con correo electrónico y contraseña.
                        Una vez accedes a la aplicación, te encontrarás con la vista principal que presenta un menú contextual con tres opciones: "Inicio", donde encontrarás un selector para eliminar del menú aquellos alimentos que no quieres incluir, y un botón que te generará una tabla con el menú semanal compuesto por Desayuno, Almuerzo, Merienda y Cena. La siguiente pestaña es esta en la que te encuentras ahora, "Acerca de Babyñam" para que tengas información básica sobre la aplicación. Por último, encontrarás la opción "Genera Receta" que incuye un selector para el tipo de receta que quieres (desayuno, almuerzo, etc) y un selector de ingredientes para excluir alguno si es necesario. Al clicar en el botón Generar Receta te sugerimos una receta para el tipo de comida que hayas seleccionado.
                        <br />
                        Para acceder a la aplicación, siempre tendrás que iniciar sesión con tu correo electrónico y contraseña.
                        Una vez en la vista principal, podrás seleccionar la opción que creas conveniente en el menú que hemos descrito anteriormente.
                        </p>

                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
