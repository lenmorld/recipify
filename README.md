## Inspiration / source

[10 JavaScript Projects in 10 Hours - Coding Challenge by Florin Pop](https://www.youtube.com/watch?v=dtKciwk_si4&t=11656s)

Idea, UI/UX inspired by Recipe App which is implemented in vanilla JS
- Big thanks to [Florin Pop](https://www.florin-pop.com/)

This version is done in React

## API

https://www.themealdb.com/api.php

- random recipe, get by first letter
- includes recipe Youtube video for most recipes

## Icons and Fonts

https://fontawesome.com


Nunito
https://fonts.google.com/specimen/Nunito?sidebar.open=true&selection.family=Nunito:wght@200

## Design

https://uidesigndaily.com/posts/sketch-recipe-app-food-mobile-day-615
https://www.allrecipes.com


## Colors

https://coolors.co/4da871-85bda6-f3e8ee


## Highlights

- Modal component using React Portal
    - https://reactjs.org/docs/portals.html

- FontAwesome component
    - `isSolid` props
    - hover handling

- Embedding a youtube video

    - mealdb recipe returns _watch_ url (e.g. `"https://www.youtube.com/watch?v=4aZr5hZXP_s"`), so replace with _embed_

    - Fluid width: https://css-tricks.com/fluid-width-video/

    -  ```js
            <iframe
                src={recipe.strYoutube.replace("watch?v=", "embed/").concat("?modestbranding=1")}>
            </iframe>
        ```

    - Embedding a youtube video: https://www.bitdegree.org/learn/how-to-embed-a-youtube-video


- Sync favorites to localStorage, with effects

    - on app load get from localStorage to favorites state

    - on (un)favorite, set from favorites to localStorage

## Todos

- Optimize favorites and featured state
    - use object instead of array

- Improve syncing of favorites with localStorage

- useLocalStorage hook
    - https://usehooks.com/useLocalStorage/


- Modal hook with Context Provider
    - https://dev.to/alexandprivate/your-next-react-modal-with-your-own-usemodal-hook-context-api-3jg7


## Codesandbox

https://codesandbox.io/s/react-projects-q3xky