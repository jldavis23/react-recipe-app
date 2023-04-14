import { useState } from 'react'
import './viewRecipe.css';

export function ViewRecipe({ recipe, setViewMode }) {

    return (
        <div className="view-recipe">
            <div className="cover">
                <button onClick={() => setViewMode(false)}>back</button>
                <img src={recipe.imageURL} alt={recipe.name}></img>
            </div>

            <div className="section">
                <h1>{recipe.name}</h1>
                <p>Source: {recipe.source}</p>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map(ingredient => <li>{ingredient}</li>)}
                </ul>
                <h2>Steps</h2>
                <ol>
                    {recipe.steps.map(step => <li>{step}</li>)}
                </ol>
            </div>

        </div>
    )
}