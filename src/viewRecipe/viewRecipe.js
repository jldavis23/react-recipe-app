import { useState } from 'react'
import './viewRecipe.css';

export function ViewRecipe({ recipeToView, setRecipeToView, setViewMode, recipes, setRecipes }) {
    const [editMode, setEditMode] = useState(false)

    let ingId = 1
    let ingredients
    if (!editMode) {
        ingredients = recipeToView.ingredients.map(ingredient => {
            return <li key={ingId++}>{ingredient}</li>
        })
    } else {
        ingredients = recipeToView.ingredients.map(ingredient => {
            return <input value={ingredient} key={ingId++}></input>
        })
    }
    
    
    let stepId = 1
    let steps
    if (!editMode) {
        steps = recipeToView.steps.map(step => {
            return <li key={stepId++}>{step}</li>
        })
    } else {
        steps = recipeToView.steps.map(step => {
            return <input value={step} key={stepId++}></input>
        })
    }
    

    const addOrRemoveFavorite = () => {
        const updatedRecipes = recipes.map((r) => {
            if (r.id === recipeToView.id) {
                setRecipeToView({ ...r, isFavorite: !r.isFavorite })
                return { ...r, isFavorite: !r.isFavorite }
            } else {
                return r
            }
        })
        setRecipes(updatedRecipes)
        // console.log(recipes)
    }

    const deleteRecipe = () => {
        const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeToView.id)
        setRecipes(updatedRecipes)
        setViewMode(false)
    }

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <div className="view-recipe">
            <div className="cover">
                <button className="back-button" onClick={() => setViewMode(false)}>back</button>
                <img src={recipeToView.imageURL} alt={recipeToView.name}></img>
            </div>

            <div className="section">
                {!editMode ? (
                    <>
                        <h1>{recipeToView.name}</h1>
                        <p>Source: {recipeToView.source}</p>
                        <h2>Ingredients</h2>
                        <ul>
                            {ingredients}
                        </ul>
                        <h2>Steps</h2>
                        <ol>
                            {steps}
                        </ol>
                    </>

                ) : (
                    <>
                        <input type="text" value={recipeToView.name}></input>
                        <input type="text" value={recipeToView.source}></input>
                        <h2>Ingredients</h2>
                        <ul>
                            {ingredients}
                        </ul>
                        <h2>Steps</h2>
                        <ol>
                            {steps}
                        </ol>
                    </>
                )}


                <button onClick={toggleEditMode}>{editMode ? 'save' : 'edit'}</button>
                <button onClick={deleteRecipe}>delete</button>
                <button onClick={addOrRemoveFavorite}>{recipeToView.isFavorite ? 'remove from ' : 'add to '}favorites</button>
            </div>

        </div>
    )
}