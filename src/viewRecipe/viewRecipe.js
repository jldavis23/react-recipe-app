import { useState } from 'react'
import './viewRecipe.css';

export function ViewRecipe({ recipeToView, setRecipeToView, setViewMode, recipes, setRecipes }) {
    
    const addOrRemoveFavorite = () => {
        const updatedRecipes = recipes.map((r) => {
            if (r.id === recipeToView.id) {
                setRecipeToView({...r, isFavorite: !r.isFavorite})
                return {...r, isFavorite: !r.isFavorite}
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

    return (
        <div className="view-recipe">
            <div className="cover">
                <button className="back-button" onClick={() => setViewMode(false)}>back</button>
                <img src={recipeToView.imageURL} alt={recipeToView.name}></img>
            </div>

            <div className="section">
                <h1>{recipeToView.name}</h1>
                {/* <p>Source: {recipeToView.source}</p>
                <h2>Ingredients</h2>
                <ul>
                    {recipeToView.ingredients.map(ingredient => <li>{ingredient}</li>)}
                </ul>
                <h2>Steps</h2>
                <ol>
                    {recipeToView.steps.map(step => <li>{step}</li>)}
                </ol> */}

                <button>edit</button>
                <button onClick={deleteRecipe}>delete</button>
                <button onClick={addOrRemoveFavorite}>{recipeToView.isFavorite ? 'remove from ' : 'add to '}favorites</button>
            </div>

        </div>
    )
}