// Function to convert the first letter ti a capital
function firstLetterCapital(text) {
    let capital = text.charAt(0).toUpperCase()

    return capital + text.slice(1)
}

export { firstLetterCapital }
