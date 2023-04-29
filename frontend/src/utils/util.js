// Function to convert the first letter ti a capital
function firstLetterCapital(text) {
    let capital = text.charAt(0).toUpperCase()

    return capital + text.slice(1)
}

function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== "") {
        let cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                )
                break
            }
        }
    }
    return cookieValue
}

export { firstLetterCapital, getCookie }
