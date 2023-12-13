import React from 'react';
import '../hojas.de-estilo/MenuSemanal.css';

export const MenuSemanal = ({ menu, showTable }) => {

    const getMealTitle = (categoryId) => {
        switch (categoryId) {
            case 1:
                return 'Desayuno';
            case 2:
                return 'Almuerzo';
            case 3:
                return 'Merienda';
            case 4:
                return 'Cena';
            default:
                return '';
        }
    };


    return (
        <>
            {showTable && (
                <div>
                    <div className='menu_semanal_titulo'>
                        <h3>MENÚ SEMANAL</h3>
                    </div>
                    <div className='menu_semanal_container'>
                        {menu.map((diaRecetas) => (
                            <div key={diaRecetas.dia}>
                                <div className='menu_semanal_week_day'>
                                    <h4>{diaRecetas.dia}</h4>
                                </div>
                                <div className='menu_semanal_days'>
                                    {Object.values(diaRecetas.recetas).map((receta, index) => (
                                        <div key={`${diaRecetas.dia}-${index}`} className='menu_semanal_recetas'>
                                            <div>
                                                <h5>{getMealTitle(receta.category_id)}</h5>
                                            </div>
                                            <div>
                                                
                                            </div>
                                            <p>{receta.nombre}</p>
                                            <div>
                                                <a href={receta.link} target='_blank' rel='noopener noreferrer'>
                                                    Enlace
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};