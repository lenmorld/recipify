export function pickRandomNumbersFromMaxValue(max, numPicks) {
    const picks = {}

    if (numPicks >= max) {
        // 3 => [0, 1, 2]
        return [...Array(max).keys()]
    }

    for (let i = 0; i < numPicks; i++) {
        let rand;


        do {
            rand = Math.floor((Math.random() * max))
            // console.log(rand)
        } while (picks.hasOwnProperty(rand))

        picks[rand] = rand

    }

    return Object.values(picks)
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get random between a(97) to z(122)
export function randomLetter() {
    return String.fromCharCode(randomInteger(97, 122));
}