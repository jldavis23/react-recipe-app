import { useState } from 'react'
import './App.css';
import recipeData from './data/recipes.json'
import { AddNewRecipe } from './addRecipe/addRecipe.js'
import { ViewRecipe } from './viewRecipe/viewRecipe.js'


let id = 1

export default function App() {
  const [recipes, setRecipes] = useState(recipeData)
  const [viewMode, setViewMode] = useState(false)
  const [recipeToView, setRecipeToView] = useState({})
  //console.log(recipes)

  const enterViewMode = (r) => {
    setRecipeToView(r)
    setViewMode(true)
  }

  let recipeComponents = []
  recipes.forEach(recipe => {
    recipeComponents.push(<Recipe recipe={recipe} enterViewMode={enterViewMode} key={id++} />)
  })

  return (
    <main>
      {!viewMode ? (
        <>
          <h1><span>Yum</span>Recipes</h1>
          <div className="section browse-section">
            <h2>Browse</h2>
            <div className="recipes-wrapper">
              {recipeComponents}
            </div>
          </div>

          <AddNewRecipe recipes={recipes} setRecipes={setRecipes} />
        </>

      ) : (
        <ViewRecipe recipe={recipeToView} setViewMode={setViewMode} />
      )
      }


    </main>
  )
}

function Recipe({ recipe, enterViewMode }) {
  return (
    <figure className="recipe-card" onClick={() => enterViewMode(recipe)}>
      <div className="image-div">
        <img src={recipe.imageURL} alt={recipe.name}></img>
      </div>
      <figcaption>
        <h3>{recipe.name}</h3>

      </figcaption>

    </figure>
  )
}

