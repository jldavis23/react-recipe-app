import { useState } from 'react'
import './viewRecipe.css';

export function ViewRecipe({ recipeToView, setRecipeToView, setViewMode, recipes, setRecipes }) {
    const [editMode, setEditMode] = useState(false)

    let ingId = 0
    let ingredients = []
    for (let i = 0; i < recipeToView.ingredients.length; i++) {
        ingredients.push(<Ingredient ingredient={recipeToView.ingredients[ingId]} editMode={editMode} recipeToView={recipeToView} setRecipeToView={setRecipeToView} id={ingId} key={ingId} />)
        ingId++
    }
    const addIngredient = () => {
        setRecipeToView({ ...recipeToView, ingredients: [...recipeToView.ingredients, ''] })
    }


    let stepId = 0
    let steps = []
    for (let i = 0; i < recipeToView.steps.length; i++) {
        steps.push(<Step step={recipeToView.steps[stepId]} editMode={editMode} recipeToView={recipeToView} setRecipeToView={setRecipeToView} id={stepId} key={stepId} />)
        stepId++
    }
    const addStep = () => {
        setRecipeToView({ ...recipeToView, steps: [...recipeToView.steps, ''] })
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
    }

    const deleteRecipe = () => {
        const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeToView.id)
        setRecipes(updatedRecipes)
        setViewMode(false)
    }

    const toggleEditMode = () => {
        const updatedRecipes = recipes.map(r => {
            if (r.id === recipeToView.id) {
                return r = recipeToView
            } else {
                return r
            }
        })
        setRecipes(updatedRecipes)
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
                        <input type="text" value={recipeToView.name} onChange={(e) => setRecipeToView({...recipeToView, name: e.target.value})}></input>
                        <input type="text" value={recipeToView.source} onChange={(e) => setRecipeToView({...recipeToView, source: e.target.value})}></input>
                        <h2>Ingredients</h2>
                        <ul>
                            {ingredients}
                        </ul>
                        <button onClick={addIngredient}>add Ingredient</button>
                        <h2>Steps</h2>
                        <ol>
                            {steps}
                        </ol>
                        <button onClick={addStep}>add Ingredient</button>
                    </>
                )}


                <button onClick={toggleEditMode}>{editMode ? 'save' : 'edit'}</button>
                <button onClick={deleteRecipe}>delete</button>
                <button onClick={addOrRemoveFavorite}>{recipeToView.isFavorite ? 'remove from ' : 'add to '}favorites</button>
            </div>

        </div>
    )
}

function Ingredient({ ingredient, editMode, recipeToView, setRecipeToView, id }) {
    const handleChange = (e) => {
        const newArray = recipeToView.ingredients
        newArray[id] = e.target.value
        setRecipeToView({ ...recipeToView, ingredients: newArray })
    }

    const deleteIngredient = () => {
        let newArray = recipeToView.ingredients.toSpliced(id, 1)
        setRecipeToView({ ...recipeToView, ingredients: newArray })
    }

    return (
        <>
            {!editMode ? (
                <li>{ingredient}</li>
            ) : (
                <>
                    <input value={ingredient} onChange={handleChange}></input>
                    <button onClick={deleteIngredient}>remove</button>
                </>
            )}
        </>
    )
}

function Step({ step, editMode, recipeToView, setRecipeToView, id }) {
    const handleChange = (e) => {
        const newArray = recipeToView.steps
        newArray[id] = e.target.value
        setRecipeToView({ ...recipeToView, steps: newArray })
    }

    const deleteStep = () => {
        let newArray = recipeToView.steps.toSpliced(id, 1)
        setRecipeToView({ ...recipeToView, steps: newArray })
    }

    return (
        <>
            {!editMode ? (
                <li>{step}</li>
            ) : (
                <>
                    <input value={step} onChange={handleChange}></input>
                    <button onClick={deleteStep}>remove</button>
                </>
            )}
        </>
    )
}