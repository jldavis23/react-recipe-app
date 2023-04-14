import { useState } from 'react'
import './App.css';
import recipeData from './data/recipes.json'
import { AddNewRecipe } from './addRecipe/addRecipe.js'
import { ViewRecipe } from './viewRecipe/viewRecipe.js'


//let id = 1

export default function App() {
  const [recipes, setRecipes] = useState(recipeData)
  const [viewMode, setViewMode] = useState(false)
  const [recipeToView, setRecipeToView] = useState({})
  const [allOrFavs, setAllOrFavs] = useState('all')
  const [id, setId] = useState(recipeData.length + 1)

  const enterViewMode = (r) => {
    setRecipeToView(r)
    setViewMode(true)
  }

  let recipeComponents = []
  if (allOrFavs === 'all') {
    recipes.forEach(recipe => {
      recipeComponents.push(<Recipe recipe={recipe} enterViewMode={enterViewMode} key={recipe.id} />)
    })
  } else {
    let favRecipes = recipes.filter(recipe => recipe.isFavorite === true)
    favRecipes.forEach(recipe => {
      recipeComponents.push(<Recipe recipe={recipe} enterViewMode={enterViewMode} key={recipe.id} />)
    })
  }

  return (
    <main>
      {!viewMode ? (
        <>
          <h1><span>Yum</span>Recipes</h1>
          <div className="section">
            <div className="browse-section-header">
              <h2>Browse</h2>

              <div className="sort-buttons-wrapper">
                <button className={allOrFavs === 'all' ? 'btn-active' : 'btn-inactive'} onClick={() => setAllOrFavs('all')}>ALL</button>
                <button className={allOrFavs === 'favs' ? 'btn-active' : 'btn-inactive'} onClick={() => setAllOrFavs('favs')}>FAVORITES</button>
              </div>
            </div>


            <div className="recipes-wrapper">
              {recipeComponents.length > 0 ? recipeComponents : <p>You have no favorite recipes</p>}
            </div>
          </div>

          <AddNewRecipe recipes={recipes} setRecipes={setRecipes} id={id} setId={setId} />
        </>

      ) : (
        <ViewRecipe recipeToView={recipeToView} setRecipeToView={setRecipeToView} setViewMode={setViewMode} recipes={recipes} setRecipes={setRecipes} />
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

