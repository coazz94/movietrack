import React, { useState } from "react"
import "../../static/css/test.css"

export default function Test() {
    const [userData, setUserData] = useState({
        trakt_auth: "",
    })

    function getAuth() {
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

    return (
        <>
            <button className="button" onClick={() => getAuth()}>
                Get to Login
            </button>
            <button className="button" onClick={() => checkAuth()}>
                Check Auth
            </button>
            <button className="button" onClick={() => logout()}>
                logout
            </button>
        </>
    )
}
