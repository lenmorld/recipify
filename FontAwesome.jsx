import React, { useState } from 'react'

const PINK = '#f43ea2'
const LIGHT_GRAY = 'lightgray'

export default function FontAwesome({ icon, isSolid, hoverColor, regularColor = LIGHT_GRAY }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div className="font-awesome-icon">
            <i className={`${isSolid ? "fas" : "far"} fa-${icon}`}
                style={{ color: isSolid || hovered ? (hoverColor || PINK) : regularColor }}
                onMouseOver={() => setHovered(true)}
                onMouseOut={() => setHovered(false)}
            ></i>
        </div>
    )
}

// function handleHover(prevHovered) {
//     setHovered(!prevHovered)
// }

// const [isClicked, toggleClicked] = useState(false)

// function handleClick() {
//     toggleClicked(prevClicked => !prevClicked)
// }

// return (
//     <div className="font-awesome-icon">
//         <i className={`${isClicked ? "fas" : "far"} fa-${icon}`}
//             style={{ color: isClicked ? 'purple' : 'lightgray' }}
//             onClick={handleClick}></i>
//     </div>
// )