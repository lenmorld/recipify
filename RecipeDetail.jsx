import React, { useState, useEffect } from 'react'

import FontAwesome from './FontAwesome'

function ingredientsToListItems(recipe) {
    // default strIngredient 1 to 20
    const ingredients = []

    for (let i = 1; i <= 20; i++) {
        const ingr = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`]

        if (!ingr || !measure) {
            break;
        }

        ingredients.push(<li>{`${ingr} - ${measure}`}</li>)
    }

    return ingredients
}

export default function RecipeDetail({ id, onHide }) {
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(raw => raw.json())
            .then(res => setRecipe(res.meals[0]))
    }, [id])

    if (!recipe) {
        return null;
    }

    console.log(recipe)

    const ingredients = ingredientsToListItems(recipe);

    return (
        <div className="recipe-detail">
            <div className="button-close" onClick={onHide}>
                <FontAwesome icon="window-close" />
            </div>
            <h2>{recipe.strMeal}</h2>
            <div className="media">
                {
                    recipe.strYoutube ?
                        <iframe
                            src={recipe.strYoutube.replace("watch?v=", "embed/").concat("?modestbranding=1")}>
                        </iframe>
                        :
                        <img src={recipe.strMealThumb} />
                }
            </div>

            <div className="recipe-instructions">
                {recipe.strInstructions}
            </div>
            <div className="recipe-ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {
                        ingredients
                    }
                </ul>
            </div>


        </div>
    )
}