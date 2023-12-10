import express from "express";;
import cors from "cors";
import db from './database/db.js';
import bRoutes from './routes/BRoutes.js';
import recipesCategoriesRoutes from './routes/RecipesCategoriesRoutes.js'
import recipesRoutes from './routes/RecipesRoutes.js'
import recipesIngredientsRoutes from './routes/RecipesIngredientsRoutes.js'
import usersRoutes from './routes/UsersRoutes.js'

const app = express();

app.use( cors() )
app.use( express.json() )
app.use( '/ingredientes', bRoutes)
app.use( '/recipes-categories', recipesCategoriesRoutes)
app.use( '/recipes', recipesRoutes)
app.use( '/recipesIngredients', recipesIngredientsRoutes)
app.use( '/usuario', usersRoutes  )

 db.authenticate()
 .then( () => console.log('Conexión existosa a la BD') )
 .catch( error => console.log(error) )

 db.sync()
 .then( () => console.log('Base de datos sincronizada') )
 .catch( error => console.log(error) )



app.listen(8000, ()=> {
    console.log('Server UP running in http://localhost:8000/')
})