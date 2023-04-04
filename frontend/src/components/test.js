import React, { useState } from "react"
import "../../static/css/test.css"

export function getAuth() {
    fetch("/trakt/auth-user")
        .then((response) => response.json())
        .then((data) => window.location.replace(data.url))
}

function checkAuth() {
    fetch("/trakt/is-auth")
        .then((response) => response.json())
        .then((data) =>
            setUserData((prevData) => {
                return {
                    ...prevData,
                    trakt_auth: data.status,
                }
            })
        )
    console.log(userData.trakt_auth)
}

export { checkAuth }

// function logout() {
//     const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//     }

//     fetch("/trakt/revoke-auth", requestOptions).then((response) => {
//         console.log(response)
//     })
// }
function logout() {
    fetch("/trakt/revoke-auth").then((response) => console.log(response))
    // .then((data) => console.log(data))
}
