import './App.css';
import recipeData from './data/recipes.json'
import { useState } from 'react'

export default function App() {
  const [recipes, setRecipes] = useState(recipeData)

  return (
    <main>

    </main>
  )
}

function Hello() {
  return (
    <p>Hello</p>
  )
}