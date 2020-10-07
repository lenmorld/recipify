import React, { useState, useEffect } from 'react'

import './Recipe.css'

import Modal from './Modal'
import FontAwesome from './FontAwesome'
import RecipeDetail from './RecipeDetail'

import { pickRandomNumbersFromMaxValue, randomLetter } from './utils'

function Thumbnail({ meal, onClick, onRemove }) {
    return (
        <li className="thumbnail">
            <div className="button-delete" onClick={() => onRemove(meal)}>
                <FontAwesome icon="trash-alt" regularColor="#f43ea2" hoverColor="red" />
            </div>
            <img src={meal.strMealThumb} onClick={() => onClick(meal.idMeal)} />
            <span>{meal.strMeal}</span>
        </li>
    )
}

function Meal({ meal, isFave, isFeatured, onClick, onFavorite }) {
    // const [isFavorite, toggleFavorite] = useState(false)
    const [isFavorite, toggleFavorite] = useState(isFave || false)

    function handleClickHeart() {
        console.log("fave: ", meal.idMeal)

        onFavorite(meal, !isFavorite)
        toggleFavorite(isFave => !isFave)

    }

    return (
        <div className="meal">
            <div className="meal-header" onClick={() => onClick(meal.idMeal)}>
                {
                    isFeatured && <div className="featured">Featured recipe</div>
                }
                <img src={meal.strMealThumb} />
            </div>
            <div className="meal-body">
                <h4>{meal.strMeal}</h4>
                <button onClick={handleClickHeart} className="meal-favorite">
                    <FontAwesome icon="heart" isSolid={isFavorite} />
                </button>
            </div>
        </div>
    )
}

export default function Recipe() {
    const [recipes, setRecipes] = useState([])
    const [favorites, setFavorites] = useState([])
    const [featured, setFeatured] = useState()
    const [isSearch, setSearch] = useState(false)

    const [query, setQuery] = useState("")

    const [openedRecipe, setOpenedRecipe] = useState(null)

    function hideModal() {
        setOpenedRecipe(null)
    }

    useEffect(() => {
        document.title = `🍜 Recipe app 🍝`
    }, [])

    // on app load:
    // 1: get localStorage into favorites
    // 2: get featured recipes of the day
    useEffect(() => {
        let faves = []

        if (localStorage.length) {
            try {
                faves = Object.values(localStorage).map((entry) => JSON.parse(entry));
                setFavorites(faves);
            } catch (e) {
                console.error(e);
                setFavorites([]);
            }
        }

        // get featured recipes

        // get random between a(97) to z(122)
        const _randomLetter = randomLetter()
        console.log(_randomLetter)
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${_randomLetter}`)
            // fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                // setRecipes(res.meals)

                if (res.meals.length) {
                    // FIXME
                    // setFeatured([res.meals[0], res.meals[1], res.meals[2], res.meals[3], res.meals[4], res.meals[5], res.meals[6]])
                    // setFavorites([res.meals[0], res.meals[1]])
                    // setFeatured([res.meals[res.meals.length - 1], res.meals[res.meals.length - 2], res.meals[res.meals.length - 3]])

                    // only select 3 from fetched meals
                    const numPicks = pickRandomNumbersFromMaxValue(res.meals.length, 5)

                    const mealPicks = numPicks.map(num => res.meals[num])
                    // const mealPicks = res.meals

                    // filter featured meals if they're in favorites already 
                    const featuredMeals = mealPicks.filter(m => !faves.find(fave => fave.idMeal === m.idMeal))
                    // debugger;
                    setFeatured(featuredMeals)
                }
            })
    }, [])

    // sync favorites to localStorage
    useEffect(() => {
        // TODO: optimize sync

        // state -> localStorage
        favorites.forEach(fave => {
            const id = fave.idMeal
            if (!localStorage.getItem(id)) {
                localStorage.setItem(id, JSON.stringify(fave))
            }
        })

        // remove from localStorage the ones removed in state
        Object.keys(localStorage).forEach(key => {
            if (!favorites.find(f => f.idMeal === key)) {
                localStorage.removeItem(key)
            }
        })

        // cleanup function: clear localStorage?
    }, [favorites])

    function handleQueryChange(event) {
        const _query = event.target.value
        setQuery(_query)
    }

    function handleSearchClick() {
        if (!query.trim()) {
            setSearch(false)
            return;
        }

        setSearch(true)

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setRecipes(res.meals && res.meals.length ? res.meals : [])
            })
    }

    function searchOnEnter(e) {
        if (e.key === "Enter") {
            handleQueryChange(e)
            handleSearchClick()
        }
    }

    function handleMealClick(id) {
        // id of meal is the idMeal
        console.log(id)
        setOpenedRecipe(id)
    }

    function isFave(meal) {
        return favorites.find(f => f.idMeal === meal.idMeal)
    }

    function onFavorite(faveMeal, isFave) {
        // TODO: optimize with object or save object in localStorage + only ids in state

        // debugger;
        // make fave
        if (isFave) {
            if (!favorites.find(e => e.idMeal === faveMeal.idMeal)) {
                setFavorites(prevFaves => [...prevFaves, faveMeal])
            }
        } else {
            // un-fave
            if (favorites.find(e => e.idMeal === faveMeal.idMeal)) {
                setFavorites(prevFaves => prevFaves.filter(e => e.idMeal !== faveMeal.idMeal))
            }
        }
    }

    function onUnfavorite(meal) {
        onFavorite(meal, false)
    }

    return (
        <div className="container">
            <header>
                <input type="text" value={query} onChange={handleQueryChange} placeholder="search for recipes"
                    onKeyPress={searchOnEnter} />
                <div className="search-icon" onClick={handleSearchClick}>
                    <FontAwesome icon="search" />
                </div>
            </header>
            <div className="favorite">
                <h3>Favorite recipes</h3>
                <ul className="favorite-recipe-grid">
                    {
                        favorites.map(recipe => <Thumbnail key={recipe.idMeal} meal={recipe} onClick={handleMealClick} onRemove={onUnfavorite} />)
                    }
                </ul>
            </div>
            {
                isSearch ?
                    (
                        <div className="results">
                            {
                                recipes && recipes.length ?
                                    (<React.Fragment>
                                        <h3>Search results</h3>
                                        <ul className="recipe-grid">

                                            {
                                                recipes.map(recipe =>
                                                    <li key={recipe.idMeal}>
                                                        <Meal meal={recipe} onClick={handleMealClick} onFavorite={onFavorite} isFave={isFave(recipe)} />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </React.Fragment>
                                    ) :
                                    <h3>No results :(</h3>
                            }
                        </div>
                    )
                    : (<div className="featured">
                        <h3>Featured recipes of the day</h3>
                        {
                            (!recipes || !recipes.length) && featured &&
                            (<ul className="featured-grid">
                                {
                                    featured.map(recipe =>
                                        <li key={recipe.idMeal}>
                                            <Meal meal={recipe} onClick={handleMealClick} onFavorite={onFavorite} isFave={isFave(recipe)} />
                                        </li>

                                    )
                                }
                            </ul>)
                        }
                    </div>)

            }



            {
                openedRecipe && <Modal>
                    <RecipeDetail id={openedRecipe} onHide={hideModal} />
                </Modal>
            }

        </div >)
}