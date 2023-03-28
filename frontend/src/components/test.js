import React from "react"
import "../../static/css/test.css"

export default function Test() {
    function getAuth() {
        fetch("/trakt/auth-user")
            .then((response) => response.json())
            .then((data) => window.location.replace(data.url))
    }

    return (
        <>
            <button className="button" onClick={() => getAuth()}>
                Get to Login
            </button>
        </>
    )
}
