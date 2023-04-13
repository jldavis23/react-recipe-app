import { useState } from 'react'
import './App.css';
import recipeData from './data/recipes.json'
import { AddNewRecipe } from './addRecipe/addRecipe.js'


let id = 1

export default function App() {
  const [recipes, setRecipes] = useState(recipeData)
  //console.log(recipes)


  let recipeComponents = []
  recipes.forEach(recipe => {
    recipeComponents.push(<Recipe recipe={recipe} key={id++} />)
  })

  return (
    <main>
      <h1><span>Yum</span>Recipes</h1>

      <div className="section browse-section">
        <h2>Browse</h2>
        <div className="recipes-wrapper">
          {recipeComponents}
        </div>
      </div>

      <AddNewRecipe recipes={recipes} setRecipes={setRecipes}/>

    </main>
  )
}

function Recipe({ recipe }) {
  return (
    <figure className="recipe-card">
      <div className="image-div">
        <img src={recipe.imageURL} alt={recipe.name}></img>
      </div>
      <figcaption>
        <h3>{recipe.name}</h3>

      </figcaption>

    </figure>
  )
}

