import { useState } from 'react'
import './addRecipe.css';

// ADD NEW RECIPE COMPONENT
export function AddNewRecipe({ recipes, setRecipes, id, setId }) {
    const [newRecipe, setNewRecipe] = useState({
        id: id, name: '', ingredients: [''], steps: [''], imageURL: 'https://cdn.pixabay.com/photo/2017/06/10/07/20/noodle-2389221_960_720.png', source: 'user'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(newRecipe)
        setRecipes([...recipes, newRecipe])
        setNewRecipe({
            id: id + 1, name: '', ingredients: [''], steps: [''], imageURL: '', source: 'user'
        })
        setId(id + 1)
    }

    let ingredientInputs = []
    let IngIndex = 0
    for (let i = 0; i < newRecipe.ingredients.length; i++) {
        ingredientInputs.push(<Ingredient newRecipe={newRecipe} setNewRecipe={setNewRecipe} index={IngIndex} key={IngIndex} />)
        IngIndex++
    }
    const addIngredient = () => {
        setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, ''] })
    }

    let stepInputs = []
    let stepIndex = 0
    for (let i = 0; i < newRecipe.steps.length; i++) {
        stepInputs.push(<Step newRecipe={newRecipe} setNewRecipe={setNewRecipe} index={stepIndex} key={stepIndex} />)
        stepIndex++
    }
    const addStep = () => {
        setNewRecipe({ ...newRecipe, steps: [...newRecipe.steps, ''] })
    }


    return (
        <div className="add-recipes-wrapper">
            <div className="section add-recipes-section">
                <h2>Add a Recipe</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Recipe Name:</label>
                        <input required type="text" className="input-group" value={newRecipe.name} onChange={(e) => { setNewRecipe({ ...newRecipe, name: e.target.value }) }}></input>
                    </div>

                    <label>Ingredients: </label>
                    {ingredientInputs}
                    <button type="button" onClick={addIngredient} className='add-button'>+ Ingredient</button>

                    <label>Steps: </label>
                    {stepInputs}
                    <button type="button" onClick={addStep} className='add-button'>+ Step</button>


                    <button type="submit" className="submit-button">ADD RECIPE</button>
                </form>
            </div>
        </div>

    )
}

// INGREDIENT INPUT COMPONENT
function Ingredient({ newRecipe, setNewRecipe, index }) {
    const handleChange = (e) => {
        let newArray = newRecipe.ingredients
        newArray[index] = e.target.value
        setNewRecipe({ ...newRecipe, ingredients: newArray })
    }

    const deleteIngredient = () => {
        let newArray = newRecipe.ingredients.toSpliced(index, 1)
        setNewRecipe({ ...newRecipe, ingredients: newArray })
    }

    return (
        <div className="input-group">
            <input type="text" required value={newRecipe.ingredients[index]} onChange={handleChange}></input>
            <button type="button" className="remove-button" onClick={deleteIngredient}>remove</button>
        </div>

    )
}

// STEP INPUT COMPONENT
function Step({ newRecipe, setNewRecipe, index }) {
    const handleChange = (e) => {
        let newArray = newRecipe.steps
        newArray[index] = e.target.value
        setNewRecipe({ ...newRecipe, steps: newArray })
    }

    const deleteStep = () => {
        let newArray = newRecipe.steps.toSpliced(index, 1)
        setNewRecipe({ ...newRecipe, steps: newArray })
    }

    return (
        <div className="input-group">
            <input type="text" required value={newRecipe.steps[index]} onChange={handleChange}></input>
            <button type="button" className="remove-button" onClick={deleteStep}>remove</button>
        </div>

    )
}