import './App.css';
import recipeData from './data/recipes.json'
import { useState } from 'react'

let id = 1

export default function App() {
  const [recipes, setRecipes] = useState(recipeData)
  console.log(recipes)


  let recipeComponents = []
  recipes.forEach(recipe => {
    recipeComponents.push(<Recipe recipe={recipe} key={id++} />)
  })

  return (
    <main>
      <h1><span>Yum</span>Recipes</h1>

      <div className="browse-section">
        <h2>Browse</h2>
        <div className="recipes-wrapper">
          {recipeComponents}
        </div>
      </div>

      <div className="add-recipes-section">
        <h2>Add a Recipe</h2>

        <AddNewRecipe recipes={recipes} setRecipes={setRecipes}/>
      </div>
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

function AddNewRecipe({recipes, setRecipes}) {
  const [newRecipe, setNewRecipe] = useState({
    name: '', ingredients: [''], steps: ['']
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(newRecipe)
    setRecipes([...recipes, newRecipe])
    setNewRecipe({
      name: '', ingredients: [''], steps: ['']
    })
  }

  let ingredientInputs = []
  let IngIndex = 0
  for (let i = 0; i < newRecipe.ingredients.length; i++) {
    ingredientInputs.push(<Ingredient newRecipe={newRecipe} setNewRecipe={setNewRecipe} index={IngIndex} key={IngIndex}/>)
    IngIndex++
  }
  const addIngredient = () => {
    setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, '']})
  }

  let stepInputs = []
  let stepIndex = 0
  for (let i = 0; i < newRecipe.steps.length; i++) {
    stepInputs.push(<Step newRecipe={newRecipe} setNewRecipe={setNewRecipe} index={stepIndex} key={stepIndex}/>)
    stepIndex++
  }
  const addStep = () => {
    setNewRecipe({...newRecipe, steps: [...newRecipe.steps, '']})
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Recipe Name: <br></br>
        <input type="text" value={newRecipe.name} onChange={(e) => {setNewRecipe({ ...newRecipe, name: e.target.value})}}></input>
      </label>

      <label>Ingredients: </label>
      {ingredientInputs}
      <button type="button" onClick={addIngredient}>Add Ingredient</button>

      <label>Steps: </label>
      <button type="button" onClick={addStep}>Add Step</button>
      {stepInputs}
      

      <button type="submit">Add Recipe</button>
    </form>
  )
}

function Ingredient({newRecipe, setNewRecipe, index}) {
  const handleChange = (e) => {
    let newArray = newRecipe.ingredients
    newArray[index] = e.target.value
    setNewRecipe({...newRecipe, ingredients: newArray})
  }

  const deleteIngredient = () => {
    let newArray = newRecipe.ingredients.toSpliced(index, 1)
    setNewRecipe({...newRecipe, ingredients: newArray})
  }

  return (
    <>
      <input type="text" value={newRecipe.ingredients[index]} onChange={handleChange}></input>
      <button type="button" onClick={deleteIngredient}>remove</button>
    </>
    
  )
}

function Step({newRecipe, setNewRecipe, index}) {
  const handleChange = (e) => {
    let newArray = newRecipe.steps
    newArray[index] = e.target.value
    setNewRecipe({...newRecipe, steps: newArray})
  }

  const deleteStep = () => {
    let newArray = newRecipe.steps.toSpliced(index, 1)
    setNewRecipe({...newRecipe, steps: newArray})
  }

  return (
    <>
      <div>
        <span>{index+1}.</span>
        <input type="text" value={newRecipe.steps[index]} onChange={handleChange}></input>
      </div>
      <button type="button" onClick={deleteStep}>remove</button>
    </>
    
  )
}